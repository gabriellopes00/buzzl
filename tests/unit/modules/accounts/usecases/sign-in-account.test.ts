import { Account } from '@/modules/accounts/domain/entities/account'
import { SignInError } from '@/modules/accounts/usecases/errors/sign-in-error'
import { SignInAccount, SignInParams } from '@/modules/accounts/usecases/sign-in-account'
import { MockedEncrypter } from '@t/mocks/infra/encrypter'
import { MockedHasher } from '@t/mocks/infra/hasher'
import { InMemoryAccountsRepository } from '@t/mocks/infra/repositories/in-memory-account-repository'
import { MockedUUIDGenerator } from '@t/mocks/infra/uuid-generator'

describe('Sign In Account Usecase', () => {
  const inMemoryAccountRepository = new InMemoryAccountsRepository()
  const mockedEncrypter = new MockedEncrypter()
  const mockedHasher = new MockedHasher()
  const sut = new SignInAccount(inMemoryAccountRepository, mockedHasher, mockedEncrypter)

  const signInParams: SignInParams = {
    email: 'johndoe@mail.com',
    password: 'secret_pass'
  }

  const fakeUUID = new MockedUUIDGenerator().generate()
  const fakeAccountParams = { name: 'John Doe', ...signInParams }
  const fakeAccount = Account.create(fakeAccountParams, fakeUUID).value as Account

  beforeEach(() => inMemoryAccountRepository.truncate())

  describe('Find for existing email', () => {
    it('Should return an error if received email unregistered', async () => {
      const result = await sut.signIn(signInParams)
      expect(result.isLeft()).toBeTruthy()
      expect(result.value).toEqual(new SignInError())
    })

    it('Should not call encryption given email unregistered', async () => {
      const encrypt = jest.spyOn(mockedEncrypter, 'encrypt')
      await sut.signIn(signInParams)
      expect(encrypt).not.toHaveBeenCalled()
    })
  })

  describe('Compare password', () => {
    it('Should return an error if received password is wrong', async () => {
      await inMemoryAccountRepository.create(fakeAccount)
      jest.spyOn(mockedHasher, 'compare').mockResolvedValueOnce(false)
      const result = await sut.signIn(signInParams)
      expect(result.isLeft()).toBeTruthy()
      expect(result.value).toEqual(new SignInError())
    })

    it('Should not call encryption given email unregistered', async () => {
      await inMemoryAccountRepository.create(fakeAccount)
      jest.spyOn(mockedHasher, 'compare').mockResolvedValueOnce(false)
      const encrypt = jest.spyOn(mockedEncrypter, 'encrypt')
      await sut.signIn(signInParams)
      expect(encrypt).not.toHaveBeenCalled()
    })
  })

  describe('Sign In Account', () => {
    it('Should call encryption if received email and password are valid', async () => {
      await inMemoryAccountRepository.create(fakeAccount)
      const encrypt = jest.spyOn(mockedEncrypter, 'encrypt')
      await sut.signIn(signInParams)
      expect(encrypt).toHaveBeenCalledWith({
        id: fakeAccount.id,
        name: fakeAccount.name,
        email: fakeAccount.email
      })
    })

    it('Should return a token sign in succeeds', async () => {
      await inMemoryAccountRepository.create(fakeAccount)
      const result = await sut.signIn(signInParams)
      expect(result.isRight()).toBeTruthy()
    })

    it('Should pass long the error if AccountRepository returns one', async () => {
      jest.spyOn(inMemoryAccountRepository, 'findByEmail').mockRejectedValueOnce(new Error())
      const error = sut.signIn(fakeAccount)
      await expect(error).rejects.toThrow()
    })
  })
})
