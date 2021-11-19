import { Account } from '@/modules/accounts/domain/entities/account'
import { CreateAccountParams } from '@/modules/accounts/domain/usecases/create-account'
import { ExistingEmailError } from '@/modules/accounts/domain/usecases/errors/existing-email'
import { DbCreateAccount } from '@/modules/accounts/usecases/create-account'
import mockedHasher from '@t/mocks/infra/hasher'
import { InMemoryAccountsRepository } from '@t/mocks/infra/repositories/in-memory-account-repository'
import mockedUUIDGenerator from '@t/mocks/infra/uuid-generator'

describe('Create Account Usecase', () => {
  const inMemoryAccountRepository = new InMemoryAccountsRepository()
  const sut = new DbCreateAccount(inMemoryAccountRepository, mockedUUIDGenerator, mockedHasher)

  const fakeUUID = mockedUUIDGenerator.generate()
  const fakeAccountParams: CreateAccountParams = {
    name: 'John Doe',
    email: 'johndoe@mail.com',
    password: 'secret_pass'
  }
  const fakeAccount = Account.create(fakeAccountParams, fakeUUID).value as Account

  beforeEach(() => inMemoryAccountRepository.truncate())

  describe('Find for existing email', () => {
    it('Should return an error if received email is already registered', async () => {
      await inMemoryAccountRepository.create(fakeAccount)
      const result = await sut.create(fakeAccountParams)
      expect(result.isLeft()).toBeTruthy()
      expect(result.value).toEqual(new ExistingEmailError(fakeAccountParams.email))
    })

    it('Should not call account registration if its email is already registered', async () => {
      await inMemoryAccountRepository.create(fakeAccount)
      const create = jest.spyOn(inMemoryAccountRepository, 'create')
      await sut.create(fakeAccountParams)
      expect(create).not.toHaveBeenCalled()
    })
  })

  describe('Create Account', () => {
    it('Should call account registration with correct values', async () => {
      const create = jest.spyOn(inMemoryAccountRepository, 'create')
      await sut.create(fakeAccountParams)

      const hashedPassword = await mockedHasher.generate(fakeAccountParams.password)
      // ensure AccountRepository hs been called with correct generated UUID and hashed password
      expect(create).toHaveBeenCalledWith(
        expect.objectContaining({ ...fakeAccountParams, id: fakeUUID, password: hashedPassword })
      )
    })

    it('Should return an account data if its registration succeeds', async () => {
      const result = await sut.create(fakeAccountParams)
      expect(result.isRight()).toBeTruthy()
      expect(result.value).toEqual(expect.objectContaining({ ...fakeAccountParams, id: fakeUUID }))
    })

    it('Should pass long the error if AccountRepository returns one', async () => {
      jest.spyOn(inMemoryAccountRepository, 'create').mockRejectedValueOnce(new Error())
      const error = sut.create(fakeAccount)
      await expect(error).rejects.toThrow()
    })
  })
})
