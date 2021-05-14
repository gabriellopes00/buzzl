import { UnmatchedPasswordError } from '@/domain/user/errors/unmatched-password'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { UserSignIn } from '@/usecases/user/sign-in'
import { MockEncrypter } from '../../mocks/encrypter'
import { MockHasher } from '../../mocks/hasher'
import { fakeSignInParams, fakeUser } from '../../mocks/user'
import { MockUserRepository } from '../../mocks/user-repository'

describe('User Authenticator', () => {
  const mockUserRepository = new MockUserRepository() as jest.Mocked<MockUserRepository>
  const mockHasher = new MockHasher() as jest.Mocked<MockHasher>
  const mockEncrypter = new MockEncrypter() as jest.Mocked<MockEncrypter>
  const sut = new UserSignIn(mockUserRepository, mockHasher, mockEncrypter)

  describe('User Repository', () => {
    it('Should call userRepository findOneEmail with correct email once before hashComparer', async () => {
      const find = jest.spyOn(mockUserRepository, 'findOne')
      const compare = jest.spyOn(mockHasher, 'compare')
      await sut.sign(fakeSignInParams)
      expect(find).toHaveBeenCalledWith({ email: fakeSignInParams.email })

      const findCall = find.mock.invocationCallOrder[0]
      const compareCall = compare.mock.invocationCallOrder[0]
      expect(findCall).toBeLessThan(compareCall)
    })

    it('Should return a UnregisteredEmail error if received email is not registered', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null)
      const result = await sut.sign(fakeSignInParams)
      expect(result).toEqual(new UnregisteredEmailError(fakeSignInParams.email))
    })

    it('Should throws if userRepository throws', async () => {
      mockUserRepository.findOne.mockRejectedValueOnce(new Error())
      const error = sut.sign(fakeSignInParams)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Hasher', () => {
    it('Should not be called if userRepository does not found a user with received email', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null)
      const compare = jest.spyOn(mockHasher, 'compare')
      await sut.sign(fakeSignInParams)
      expect(compare).not.toHaveBeenCalled()
    })

    it('Should call hash comparer with received password', async () => {
      const compare = jest.spyOn(mockHasher, 'compare')
      await sut.sign(fakeSignInParams)

      const hash = await mockHasher.generate('')
      expect(compare).toHaveBeenCalledWith(fakeSignInParams.password, hash)
    })

    it('Should return an UnmatchedPasswordError if received an incorrect password', async () => {
      mockHasher.compare.mockResolvedValueOnce(false)
      const error = await sut.sign(fakeSignInParams)
      expect(error).toEqual(new UnmatchedPasswordError(fakeSignInParams.email))
    })
  })

  describe('Encrypter', () => {
    it('Should call encrypter with correct id', async () => {
      const encrypt = jest.spyOn(mockEncrypter, 'encrypt')
      await sut.sign(fakeSignInParams)
      expect(encrypt).toHaveBeenCalledWith({ id: fakeUser.id })
    })

    it('Should return a token on success', async () => {
      const token = await sut.sign(fakeSignInParams)
      expect(token).toEqual(await mockEncrypter.encrypt(''))
    })
  })
})
