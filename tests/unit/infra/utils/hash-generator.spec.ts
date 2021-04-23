import { BcryptHasher } from '@/infra/utils/bcrypt-hash-generator'

import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'fake_hash'
  },
  async compare(): Promise<boolean> {
    return true
  }
}))

describe('Hash Generator', () => {
  const salt = 12
  const sut = new BcryptHasher()

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
