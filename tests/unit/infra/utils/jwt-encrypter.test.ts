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
  const privateKey = 'private_key'
  const publicKey = 'public_key'
  const expiration = '15m'

  const mockJwt = jwt as jest.Mocked<typeof jwt>
  const sut = new JWTEncrypter(privateKey, publicKey, expiration)

  describe('Encrypt', () => {
    it('Should call sign with correct values', async () => {
      const sign = jest.spyOn(jwt, 'sign')
      await sut.encrypt({ payload: 'any_value' })
      expect(sign).toHaveBeenCalledWith({ payload: 'any_value' }, privateKey, {
        algorithm: 'RS256',
        expiresIn: expiration
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
    test('Should call verify method with correct values', async () => {
      const verify = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verify).toHaveBeenCalledWith('any_token', publicKey, { algorithms: ['RS256'] })
    })

    test('Should return null if decryption throws', async () => {
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error('invalid token')
      })
      const value = await sut.decrypt('any_token')
      expect(value).toBeNull()
    })

    test('Should return decrypted value if decryption succeeded', async () => {
      const value = await sut.decrypt('any_token')
      expect(value).toBe('payload')
    })
  })
})
