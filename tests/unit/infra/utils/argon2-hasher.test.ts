import { Argon2Hasher } from '@/infra/utils/argon2-hasher'

import { verify, hash } from 'argon2'

describe('Argon2 Hasher', () => {
  const sut = new Argon2Hasher()
  const payload = 'fake_payload'

  describe('Generate', () => {
    it('Should generate a valid hash verified by argon2 on success', async () => {
      const hash = await sut.generate(payload)
      const verified = verify(hash, payload)
      expect(verified).toBeTruthy()
    })

    it('Should throw if argon2 hasher throws', async () => {
      jest
        .spyOn(sut, 'generate')
        .mockImplementationOnce(() => new Promise((resolve, reject) => reject(new Error())))
      const error = sut.generate(payload)
      await expect(error).rejects.toThrow()
    })
  })

  describe('Comparer', () => {
    it('Should return true when compare succeeds', async () => {
      const validHash = await hash(payload)
      const isValid = await sut.compare(payload, validHash)
      expect(isValid).toBe(true)
    })

    it('Should return false when compare fails', async () => {
      const invalidHash = await hash('different_payload')
      const isValid = await sut.compare(payload, invalidHash)
      expect(isValid).toBe(false)
    })
  })
})
