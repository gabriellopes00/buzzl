import {
  SignInAccountController,
  SignInAccountControllerParams
} from '@/modules/accounts/controllers/sign-in-account-controller'
import { SignInError } from '@/modules/accounts/domain/usecases/errors/sign-in-error'
import { DbSignInAccount } from '@/modules/accounts/usecases/sign-in-account'
import { badRequest, serverError, unauthorized } from '@/presentation/helpers/http'
import { left } from '@/shared/either'
import { MockedEncrypter } from '@t/mocks/common/encrypter'
import { MockedValidator } from '@t/mocks/common/validator'
import { MockedHasher } from '@t/mocks/infra/hasher'
import { InMemoryAccountsRepository } from '@t/mocks/infra/repositories/in-memory-account-repository'

describe('Sign In Account Controller', () => {
  const mockedValidator = new MockedValidator()
  const mockedEncrypter = new MockedEncrypter()
  const mockedHasher = new MockedHasher()
  const inMemoryRepository = new InMemoryAccountsRepository()

  const signInAccount = new DbSignInAccount(inMemoryRepository, mockedHasher, mockedEncrypter)
  const sut = new SignInAccountController(mockedValidator, signInAccount)

  const params: SignInAccountControllerParams = {
    email: 'johndoe@mail.com',
    password: 'secret_pass'
  }

  beforeEach(() => inMemoryRepository.truncate())

  describe('Validation', () => {
    it('Should call validator with correct values', async () => {
      const validator = jest.spyOn(mockedValidator, 'validate')
      await sut.handle(params)

      expect(validator).toHaveBeenCalledWith(params)
    })

    it('Should return 400 response if validation fails', async () => {
      jest.spyOn(mockedValidator, 'validate').mockReturnValueOnce(new Error())
      const response = await sut.handle(params)
      expect(response).toEqual(badRequest(new Error()))
    })
  })

  describe('Sign In Account Usecase', () => {
    it('Should not call SignIn usecase if validation fails', async () => {
      const create = jest.spyOn(signInAccount, 'signIn')
      jest.spyOn(mockedValidator, 'validate').mockReturnValueOnce(new Error())
      await sut.handle(params)
      expect(create).not.toHaveBeenCalled()
    })

    it('Should return a 401 response if received email if receive an unregistered email', async () => {
      jest.spyOn(signInAccount, 'signIn').mockResolvedValueOnce(left(new SignInError()))
      const response = await sut.handle(params)
      expect(response).toEqual(unauthorized(new SignInError()))
    })

    it('Should return a 401 response if received a wrong password', async () => {
      jest.spyOn(signInAccount, 'signIn').mockResolvedValueOnce(left(new SignInError()))
      jest.spyOn(mockedHasher, 'compare').mockResolvedValueOnce(false)
      const response = await sut.handle(params)
      expect(response).toEqual(unauthorized(new SignInError()))
    })
  })

  it('Should return a 500 response if something throws', async () => {
    jest.spyOn(signInAccount, 'signIn').mockRejectedValueOnce(new Error('some error'))
    const response = await sut.handle(params)
    expect(response).toEqual(serverError(new Error('some error')))
  })
})
