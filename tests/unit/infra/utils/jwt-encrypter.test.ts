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

  describe('Encrypter', () => {
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
})
