import {
  CreateAccountController,
  CreateAccountControllerParams
} from '@/modules/accounts/controllers/create-account-controller'
import { badRequest, conflict, created, serverError } from '@/presentation/helpers/http'
import { left } from '@/shared/either'
import { MockedEncrypter } from '@t/mocks/infra/encrypter'
import { MockedValidator } from '@t/mocks/infra/validator'
import { MockedHasher } from '@t/mocks/infra/hasher'
import { InMemoryAccountsRepository } from '@t/mocks/infra/repositories/in-memory-account-repository'
import { MockedUUIDGenerator } from '@t/mocks/infra/uuid-generator'
import { CreateAccount } from '@/modules/accounts/usecases/create-account'
import { ExistingEmailError } from '@/modules/accounts/usecases/errors/existing-email'

describe('Create Account Controller', () => {
  const mockedValidator = new MockedValidator()
  const inMemoryRepository = new InMemoryAccountsRepository()

  const createAccount = new CreateAccount(
    inMemoryRepository,
    new MockedUUIDGenerator(),
    new MockedHasher()
  )
  const mockedEncrypter = new MockedEncrypter()
  const sut = new CreateAccountController(mockedValidator, createAccount, mockedEncrypter)

  const fakeUUID = new MockedUUIDGenerator().generate()
  const createAccountParams: CreateAccountControllerParams = {
    name: 'John Doe',
    email: 'johndoe@mail.com',
    password: 'secret_pass'
  }

  beforeEach(() => inMemoryRepository.truncate())

  describe('Validation', () => {
    it('Should call validator with correct values', async () => {
      const validator = jest.spyOn(mockedValidator, 'validate')
      await sut.handle(createAccountParams)

      expect(validator).toHaveBeenCalledWith(createAccountParams)
    })

    it('Should return 400 response if validation fails', async () => {
      jest.spyOn(mockedValidator, 'validate').mockReturnValueOnce(new Error())
      const response = await sut.handle(createAccountParams)
      expect(response).toEqual(badRequest(new Error()))
    })
  })

  describe('Create Account Usecase', () => {
    it('Should not call CreateAccount usecase if validation fails', async () => {
      const create = jest.spyOn(createAccount, 'create')
      jest.spyOn(mockedValidator, 'validate').mockReturnValueOnce(new Error())
      await sut.handle(createAccountParams)
      expect(create).not.toHaveBeenCalled()
    })

    it('Should return a 409 response if received email is already in use', async () => {
      jest
        .spyOn(createAccount, 'create')
        .mockResolvedValueOnce(left(new ExistingEmailError('johndoe@mail.com')))
      const response = await sut.handle(createAccountParams)
      expect(response).toEqual(conflict(new ExistingEmailError('johndoe@mail.com')))
    })
  })

  it('Should return a 500 response if something throws', async () => {
    jest.spyOn(createAccount, 'create').mockRejectedValueOnce(new Error('some error'))
    const response = await sut.handle(createAccountParams)
    expect(response).toEqual(serverError(new Error('some error')))
  })

  describe('Access Token Encryption', () => {
    it('Should call token encrypter with created account credentials', async () => {
      const encrypt = jest.spyOn(mockedEncrypter, 'encrypt')
      await sut.handle(createAccountParams)
      const { name, email } = createAccountParams
      expect(encrypt).toHaveBeenCalledWith({ id: fakeUUID, name, email })
    })

    it('Should return 201 response with created account and access token', async () => {
      const response = await sut.handle(createAccountParams)
      expect(response).toEqual(
        created({
          account: expect.any(Object),
          access_token: expect.any(String)
        })
      )
    })
  })
})
