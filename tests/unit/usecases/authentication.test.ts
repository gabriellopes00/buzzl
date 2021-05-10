import { UserAuthentication } from '@/usecases/implementation/user/authentication'
import { MockEncrypter } from '../../mocks/encrypter'
import { fakeAuthParam } from '../../mocks/user'
import { MockUserRepository } from '../../mocks/user-repository'

describe('User Authentication', () => {
  const mockUserRepository = new MockUserRepository() as jest.Mocked<MockUserRepository>
  const mockEncrypter = new MockEncrypter() as jest.Mocked<MockEncrypter>
  const sut = new UserAuthentication(mockEncrypter, mockUserRepository)

  describe('Encrypter', () => {
    it('Should call decrypt with correct id', async () => {
      const decrypt = jest.spyOn(mockEncrypter, 'decrypt')
      await sut.auth(fakeAuthParam)
      expect(decrypt).toHaveBeenCalledWith(fakeAuthParam)
    })

    it('Should return a payload on success', async () => {
      const payload = await sut.auth(fakeAuthParam)
      expect(payload).toEqual(await mockUserRepository.findById(''))
    })

    it('Should return null if receive an invalid token', async () => {
      mockEncrypter.decrypt.mockResolvedValueOnce(null)
      const payload = await sut.auth(fakeAuthParam)
      expect(payload).toBeNull()
    })

    it('Should throw if encrypter throws', async () => {
      mockEncrypter.decrypt.mockRejectedValueOnce(new Error())
      const error = sut.auth(fakeAuthParam)
      await expect(error).rejects.toThrow()
    })
  })

  describe('User Repository', () => {
    it('Should return a user if found one with decrypted id', async () => {
      const user = await sut.auth(fakeAuthParam)
      expect(user).toEqual(await mockUserRepository.findById(''))
    })

    it('Should not return a user if found one with decrypted id', async () => {
      jest.spyOn(mockUserRepository, 'findById').mockResolvedValueOnce(null)
      const result = await sut.auth(fakeAuthParam)
      expect(result).toBeNull()
    })

    it('Should throws if userRepository throws', async () => {
      jest.spyOn(mockUserRepository, 'findById').mockRejectedValueOnce(new Error())
      const error = sut.auth(fakeAuthParam)
      await expect(error).rejects.toThrow()
    })
  })
})
