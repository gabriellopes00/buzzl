import { BcryptHashGenerator } from '@/infra/utils/bcrypt-hash-generator'

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
  const sut = new BcryptHashGenerator()

  it('Should generate a hash on success', async () => {
    const fakePass = '_anypayload'
    const hash = await sut.hash(fakePass)
    expect(typeof hash).toBe('string')
    expect(hash).not.toEqual(fakePass)
  })

  it('Should call bcrypt hash with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('_anypayload')
    expect(hashSpy).toHaveBeenLastCalledWith('_anypayload', salt)
  })

  it('Should return a valid bcrypt hash on hash success', async () => {
    const hash = await sut.hash('_anypayload')
    expect(hash).toBe('fake_hash')
  })

  it('Should throw if bcrypt hash throws', async () => {
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error())
    const error = sut.hash('_anypayload')
    await expect(error).rejects.toThrow()
  })
})
