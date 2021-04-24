import { TOKEN_DURATION, TOKEN_PRIVATE_KEY } from '@/config/env'
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
  const mockJwt = jwt as jest.Mocked<typeof jwt>
  const sut = new JWTEncrypter(TOKEN_PRIVATE_KEY, TOKEN_DURATION)

  describe('Encrypter', () => {
    it('Should call sign with correct values', async () => {
      const sign = jest.spyOn(jwt, 'sign')
      await sut.encrypt({ payload: 'any_value' })
      expect(sign).toHaveBeenCalledWith({ payload: 'any_value' }, TOKEN_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: TOKEN_DURATION
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
