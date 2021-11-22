import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import argon2 from 'argon2'

jest.mock('argon2')

describe('Argon2 Hasher', () => {
  const mockedArgon2 = argon2 as jest.Mocked<typeof argon2>
  const sut = new Argon2Hasher()

  describe('Generate hash', () => {
    mockedArgon2.hash.mockResolvedValue('hash')
    mockedArgon2.verify.mockResolvedValue(true)

    it('Should generate a valid hash on success', async () => {
      const hash = await sut.generate('payload')
      expect(hash).toBe('hash')
    })

    it('Should throw if argon2 throws', async () => {
      mockedArgon2.hash.mockRejectedValueOnce(new Error())
      const error = sut.generate('payload')
      await expect(error).rejects.toThrow()
    })
  })

  describe('Compare hash', () => {
    it('Should return true when comparison succeeds', async () => {
      const isValid = await sut.compare('payload', 'any_hash')
      expect(isValid).toBe(true)
    })

    it('Should return false when comparison fails', async () => {
      mockedArgon2.verify.mockResolvedValue(false)
      const isValid = await sut.compare('payload', 'any_hash')
      expect(isValid).toBe(false)
    })

    it('Should throw if argon2 throws', async () => {
      mockedArgon2.verify.mockRejectedValueOnce(new Error())
      const error = sut.compare('payload', 'any_hash')
      await expect(error).rejects.toThrow()
    })
  })
})
