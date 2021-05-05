import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import argon2 from 'argon2'

jest.mock('argon2')

describe('Argon2 Hasher', () => {
  const mockArgon2 = argon2 as jest.Mocked<typeof argon2>
  const sut = new Argon2Hasher()
  const payload = 'fake_payload'

  describe('Generate', () => {
    mockArgon2.hash.mockResolvedValue('hash')
    mockArgon2.verify.mockResolvedValue(true)

    it('Should generate a valid hash on success', async () => {
      const hash = await sut.generate(payload)
      expect(hash).toBe('hash')
    })

    it('Should throw if argon2 hasher throws', async () => {
      mockArgon2.hash.mockRejectedValueOnce(new Error())
      const error = sut.generate(payload)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Comparer', () => {
    it('Should return true when compare succeeds', async () => {
      const isValid = await sut.compare(payload, 'any_hash')
      expect(isValid).toBe(true)
    })

    it('Should return false when compare fails', async () => {
      mockArgon2.verify.mockResolvedValue(false)
      const isValid = await sut.compare(payload, 'any_hash')
      expect(isValid).toBe(false)
    })

    it('Should throw if argon2 verify throws', async () => {
      mockArgon2.verify.mockRejectedValueOnce(new Error())
      const error = sut.compare(payload, 'any_hash')
      await expect(error).rejects.toThrow()
    })
  })
})
