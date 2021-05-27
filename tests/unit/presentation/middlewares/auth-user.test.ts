import { ForbiddenError } from '@/presentation/errors/forbidden'
import { UnauthorizedError } from '@/presentation/errors/unauthorized'
import { badRequest, forbidden, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { AuthUserMiddleware, AuthUserRequest } from '@/presentation/middlewares/auth-user'
import { MockValidator } from '@t/mocks/common/validator'
import { MockAuthentication } from '@t/mocks/user/auth-user'

describe('Auth User Middleware', () => {
  const mockAuthenticator = new MockAuthentication() as jest.Mocked<MockAuthentication>
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const sut = new AuthUserMiddleware(mockValidator, mockAuthenticator)

  const fakeParams: AuthUserRequest = { accessToken: 'access_token' }

  describe('Validation', () => {
    it('Should call validator with received request data', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      await sut.handle(fakeParams)
      expect(validate).toHaveBeenCalledWith(fakeParams)
    })

    it('Should return an 400 response if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(badRequest(new Error()))
    })

    it('Should return an 500 response if validation throws', async () => {
      mockValidator.validate.mockImplementationOnce(() => {
        throw new Error()
      })
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })

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
      expect(response).toEqual(unauthorized(new UnauthorizedError('Invalid authentication token')))
    })

    it('Should return a 500 response if authentication throws', async () => {
      mockAuthenticator.auth.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})
