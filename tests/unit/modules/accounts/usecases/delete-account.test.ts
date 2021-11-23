import { Account } from '@/modules/accounts/domain/entities/account'
import { CreateAccountParams } from '@/modules/accounts/domain/usecases/create-account'
import { IdNotFoundError } from '@/modules/accounts/domain/usecases/errors/id-not-found'
import { DbDeleteAccount } from '@/modules/accounts/usecases/delete-account'
import { InMemoryAccountsRepository } from '@t/mocks/infra/repositories/in-memory-account-repository'
import mockedUUIDGenerator from '@t/mocks/infra/uuid-generator'

describe('Delete Account Usecase', () => {
  const inMemoryAccountRepository = new InMemoryAccountsRepository()
  const sut = new DbDeleteAccount(inMemoryAccountRepository)

  const fakeUUID = mockedUUIDGenerator.generate()
  const fakeAccountParams: CreateAccountParams = {
    name: 'John Doe',
    email: 'johndoe@mail.com',
    password: 'secret_pass'
  }
  const fakeAccount = Account.create(fakeAccountParams, fakeUUID).value as Account

  beforeEach(() => inMemoryAccountRepository.truncate())

  describe('Find for existing id', () => {
    it('Should return an error if received id is not assigned to any account', async () => {
      const result = await sut.delete(fakeUUID)
      expect(result.isLeft()).toBeTruthy()
      expect(result.value).toEqual(new IdNotFoundError(fakeUUID))
    })

    it('Should not call account deletion if its id is not found', async () => {
      const del = jest.spyOn(inMemoryAccountRepository, 'delete')
      await sut.delete(fakeUUID)
      expect(del).not.toHaveBeenCalled()
    })
  })

  describe('Delete Account', () => {
    it('Should call account deletion with correct values', async () => {
      await inMemoryAccountRepository.create(fakeAccount)
      const del = jest.spyOn(inMemoryAccountRepository, 'delete')
      await sut.delete(fakeUUID)
      expect(del).toHaveBeenCalledWith(fakeUUID)
    })

    it('Should return void if account deletion succeeds', async () => {
      await inMemoryAccountRepository.create(fakeAccount)
      const result = await sut.delete(fakeUUID)
      expect(result.isRight()).toBeTruthy()
    })

    it('Should pass long the error if AccountRepository returns one', async () => {
      await inMemoryAccountRepository.create(fakeAccount)
      jest.spyOn(inMemoryAccountRepository, 'delete').mockRejectedValueOnce(new Error())
      const error = sut.delete(fakeUUID)
      await expect(error).rejects.toThrow()
    })
  })
})
