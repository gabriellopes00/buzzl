import { ForbiddenError } from '@/presentation/errors/forbidden'
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { AuthUserMiddleware, AuthUserRequest } from '@/presentation/middlewares/auth-user'
import { MockAuthentication } from '../../../mocks/auth-user'

describe('Auth User Middleware', () => {
  const mockAuthenticator = new MockAuthentication() as jest.Mocked<MockAuthentication>
  const sut = new AuthUserMiddleware(mockAuthenticator)

  const fakeParams: AuthUserRequest = { accessToken: 'access_token' }

  describe('Authenticator', () => {
    it('Should call authentication usecase with correct values', async () => {
      const auth = jest.spyOn(mockAuthenticator, 'auth')
      await sut.handle(fakeParams)
      expect(auth).toHaveBeenCalledWith(fakeParams.accessToken)
    })

    it('Should return 200 response with decrypted payload data on success', async () => {
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(ok(expect.any(Object)))
    })

    it('Should return 403 response if is missing access token', async () => {
      let response = await sut.handle(null)
      expect(response).toEqual(forbidden(new ForbiddenError('Authentication token required')))

      response = await sut.handle({ accessToken: null })
      expect(response).toEqual(forbidden(new ForbiddenError('Authentication token required')))
    })

    it('Should return a 401 response if receive an invalid or expired access token', async () => {
      mockAuthenticator.auth.mockResolvedValueOnce(null)
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(unauthorized('Invalid authentication token'))
    })

    it('Should return a 500 response if authentication throws', async () => {
      mockAuthenticator.auth.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})
