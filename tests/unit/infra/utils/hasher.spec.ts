import { BcryptHasher } from '@/infra/utils/bcrypt-hasher'

import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'fake_hash'
  },
  async compare(): Promise<boolean> {
    return true
  }
}))

const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>

describe('Hasher', () => {
  const salt = 12
  const sut = new BcryptHasher()

  describe('Generate', () => {
    it('Should generate a hash on success', async () => {
      const fakePass = '_anypayload'
      const hash = await sut.generate(fakePass)
      expect(typeof hash).toBe('string')
      expect(hash).not.toEqual(fakePass)
    })

    it('Should call bcrypt hasher generate with correct values', async () => {
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.generate('_anypayload')
      expect(hashSpy).toHaveBeenLastCalledWith('_anypayload', salt)
    })

    it('Should return a valid hash if generate succeeds', async () => {
      const hash = await sut.generate('_anypayload')
      expect(hash).toBe('fake_hash')
    })

    it('Should throw if bcrypt hasher throws', async () => {
      jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error())
      const error = sut.generate('_anypayload')
      await expect(error).rejects.toThrow()
    })
  })

  describe('Comparer', () => {
    test('Should call compare with correct values', async () => {
      const compare = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_payload', 'fake_hash')
      expect(compare).toHaveBeenLastCalledWith('any_payload', 'fake_hash')
    })

    test('Should return true when compare succeeds', async () => {
      const isValid = await sut.compare('any_payload', 'fake_hash')
      expect(isValid).toBe(true)
    })

    test('Should return false when compare fails', async () => {
      mockBcrypt.compare.mockResolvedValueOnce(false)
      const isValid = await sut.compare('any_payload', 'fake_hash')
      expect(isValid).toBe(false)
    })

    test('Should throw if compre throws', async () => {
      mockBcrypt.compare.mockRejectedValueOnce(new Error())
      const isValid = sut.compare('any_payload', 'fake_hash')
      await expect(isValid).rejects.toThrow()
    })
  })
})
