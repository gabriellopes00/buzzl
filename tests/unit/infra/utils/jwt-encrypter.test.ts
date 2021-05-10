import { JWTEncrypter } from '@/infra/utils/jwt-encrypter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return 'token'
  },

  async verify(): Promise<string> {
    return 'payload'
  }
}))

describe('Jwt Encrypter', () => {
  const fakePrivateKey = 'private_key'
  const fakePublicKey = 'public_key'
  const fakeExpiration = '15m'

  const mockJwt = jwt as jest.Mocked<typeof jwt>
  const sut = new JWTEncrypter(fakePrivateKey, fakePublicKey, fakeExpiration)

  describe('Encrypt', () => {
    it('Should call sign with correct values', async () => {
      const sign = jest.spyOn(jwt, 'sign')
      await sut.encrypt({ payload: 'any_value' })
      expect(sign).toHaveBeenCalledWith({ payload: 'any_value' }, fakePrivateKey, {
        algorithm: 'RS256',
        expiresIn: fakeExpiration
      })
    })

    it('Should return a token on success', async () => {
      const token = await sut.encrypt({ payload: 'any_value' })
      expect(token).toBe('token')
    })

    it('Should throw if sign method throws', async () => {
      mockJwt.sign.mockImplementationOnce(() => {
        throw new Error()
      })
      const errorPromise = sut.encrypt({ payload: 'any_value' })
      await expect(errorPromise).rejects.toThrow()
    })
  })

  describe('Decrypt', () => {
    test('Should call verify with correct values', async () => {
      const verify = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verify).toHaveBeenCalledWith('any_token', fakePublicKey, { algorithms: ['RS256'] })
    })

    test('Should return a value on verify success', async () => {
      const value = await sut.decrypt('any_token')
      expect(value).toBe('payload')
    })

    // test('Should return null if receive a invalid token', async () => {
    //   mockJwt.verify.mockRejectedValueOnce(new JsonWebTokenError('') as never)
    //   const value = await sut.decrypt('invalid_token')
    //   expect(value).toBeNull()
    // })

    test('Should throw if verify throws', async () => {
      mockJwt.verify.mockRejectedValueOnce(new Error() as never)
      const error = sut.decrypt('any_token')
      await expect(error).rejects.toThrow()
    })
  })
})
