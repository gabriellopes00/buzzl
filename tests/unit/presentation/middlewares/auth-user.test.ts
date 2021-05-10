import { UnauthorizedError } from '@/presentation/errors/unauthorized'
import { forbidden, ok, serverError } from '@/presentation/helpers/http'
import { AuthUserMiddleware, AuthUserRequest } from '@/presentation/middlewares/auth-user'
import { MockAuthentication } from '../../../mocks/auth-user'

describe('Auth User Middleware', () => {
  const mockAuthenticator = new MockAuthentication() as jest.Mocked<MockAuthentication>
  const sut = new AuthUserMiddleware(mockAuthenticator)

  const fakeParams: AuthUserRequest = { accessToken: 'access_token' }

  describe('Authenticator', () => {
    it('Should call authentication with correct values', async () => {
      const auth = jest.spyOn(mockAuthenticator, 'auth')
      await sut.handle(fakeParams)
      expect(auth).toHaveBeenCalledWith(fakeParams.accessToken)
    })

    it('Should return a 200 response with decrypted payload data', async () => {
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(ok(expect.any(Object)))
    })

    it('Should return a 403 response if is missing access token', async () => {
      const response = await sut.handle(null)
      expect(response).toEqual(forbidden(new UnauthorizedError('Missing authentication token')))
    })

    it('Should return a 500 response if authentication throws', async () => {
      mockAuthenticator.auth.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})
