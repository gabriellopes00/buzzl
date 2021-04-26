import { UnmatchedPasswordError } from '@/domain/usecases/errors/user/unmatched-password'
import { UnregisteredEmailError } from '@/domain/usecases/errors/user/unregistered-email'
import { UserAuthenticator } from '@/usecases/implementation/auth-user'
import { MockAccessTokenRepository } from '../mocks/access-token-repository'
import { MockEncrypter } from '../mocks/encrypter'
import { MockHasher } from '../mocks/hasher'
import { fakeAuthParams, fakeUser } from '../mocks/user'
import { MockUserRepository } from '../mocks/user-repository'

describe('User Authenticator', () => {
  const mockUserRepository = new MockUserRepository() as jest.Mocked<MockUserRepository>
  const mockHasher = new MockHasher() as jest.Mocked<MockHasher>
  const mockEncrypter = new MockEncrypter() as jest.Mocked<MockEncrypter>
  const mockAccessTokenRepository = new MockAccessTokenRepository() as jest.Mocked<MockAccessTokenRepository>
  const sut = new UserAuthenticator(
    mockUserRepository,
    mockHasher,
    mockEncrypter,
    mockAccessTokenRepository
  )

  describe('User Repository', () => {
    it('Should call userRepository findByEmail with correct email once before hashComparer', async () => {
      const find = jest.spyOn(mockUserRepository, 'findByEmail')
      const compare = jest.spyOn(mockHasher, 'compare')
      await sut.auth(fakeAuthParams)
      expect(find).toHaveBeenCalledWith(fakeAuthParams.email)

      const findCall = find.mock.invocationCallOrder[0]
      const compareCall = compare.mock.invocationCallOrder[0]
      expect(findCall).toBeLessThan(compareCall)
    })

    it('Should return a UnregisteredEmail error if received email is not registered', async () => {
      mockUserRepository.findByEmail.mockResolvedValueOnce(null)
      const result = await sut.auth(fakeAuthParams)
      expect(result).toEqual(new UnregisteredEmailError(fakeAuthParams.email))
    })

    it('Should throws if userRepository throws', async () => {
      mockUserRepository.findByEmail.mockRejectedValueOnce(new Error())
      const error = sut.auth(fakeAuthParams)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Hasher', () => {
    it('Should not be called if userRepository does not found a user with received email', async () => {
      mockUserRepository.findByEmail.mockResolvedValueOnce(null)
      const compare = jest.spyOn(mockHasher, 'compare')
      await sut.auth(fakeAuthParams)
      expect(compare).not.toHaveBeenCalled()
    })

    it('Should call hash comparer with received password', async () => {
      const compare = jest.spyOn(mockHasher, 'compare')
      await sut.auth(fakeAuthParams)

      const hash = await mockHasher.generate('')
      expect(compare).toHaveBeenCalledWith(fakeAuthParams.password, hash)
    })

    it('Should return an UnmatchedPasswordError if received an incorrect password', async () => {
      mockHasher.compare.mockResolvedValueOnce(false)
      const error = await sut.auth(fakeAuthParams)
      expect(error).toEqual(new UnmatchedPasswordError(fakeAuthParams.email))
    })
  })

  describe('Encrypter', () => {
    it('Should call encrypter with correct id', async () => {
      const encrypt = jest.spyOn(mockEncrypter, 'encrypt')
      await sut.auth(fakeAuthParams)
      expect(encrypt).toHaveBeenCalledWith({ id: fakeUser.id })
    })

    it('Should return a token on success', async () => {
      const token = await sut.auth(fakeAuthParams)
      expect(token).toEqual(await mockEncrypter.encrypt(''))
    })
  })

  describe('Access Token Repository', () => {
    it('Should call accessToken repository with correct values', async () => {
      const add = jest.spyOn(mockAccessTokenRepository, 'add')
      await sut.auth(fakeAuthParams)
      expect(add).toHaveBeenCalledWith(await mockEncrypter.encrypt(''), fakeUser.email)
    })
  })
})
