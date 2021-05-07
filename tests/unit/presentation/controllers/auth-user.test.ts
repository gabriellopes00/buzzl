import { UnmatchedPasswordError } from '@/domain/usecases/user/errors/unmatched-password'
import { UnregisteredEmailError } from '@/domain/usecases/user/errors/unregistered-email'
import { AuthUserController, AuthUserResponse } from '@/presentation/controllers/auth-user'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { fakeAuthParams } from '../../../mocks/user'
import { MockAuthenticator } from '../../../mocks/user-authenticator'
import { MockValidator } from '../../../mocks/validator'

describe('Auth User Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockAuthenticator = new MockAuthenticator() as jest.Mocked<MockAuthenticator>
  const sut = new AuthUserController(mockValidator, mockAuthenticator)

  describe('Validation', () => {
    it('Should call validator with received request data', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      await sut.handle(fakeAuthParams)
      expect(validate).toHaveBeenCalledWith(fakeAuthParams)
    })

    it('Should return an 400 response if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const response = await sut.handle(fakeAuthParams)
      expect(response).toEqual(badRequest(new Error()))
    })

    it('Should call validator before call authenticator usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const auth = jest.spyOn(mockAuthenticator, 'auth')
      await sut.handle(fakeAuthParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const authCall = auth.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(authCall)
    })
  })

  describe('Authentication', () => {
    it('Should call authenticator with correct values', async () => {
      const auth = jest.spyOn(mockAuthenticator, 'auth')
      await sut.handle(fakeAuthParams)
      expect(auth).toHaveBeenCalledWith(fakeAuthParams)
    })

    it('Should return a 200 response with created and authenticated user data', async () => {
      const response = await sut.handle(fakeAuthParams)
      expect(response).toEqual(
        ok<AuthUserResponse>({ accessToken: expect.any(String) })
      )
    })

    it('Should return a 400 if received email is not registered', async () => {
      mockAuthenticator.auth.mockResolvedValueOnce(new UnregisteredEmailError('any@mail.com'))
      const response = await sut.handle(fakeAuthParams)
      expect(response).toEqual(badRequest(new UnregisteredEmailError('any@mail.com')))
    })

    it('Should return a 401 if received unmatched password for respective email', async () => {
      mockAuthenticator.auth.mockResolvedValueOnce(new UnmatchedPasswordError('any@mail.com'))
      const response = await sut.handle(fakeAuthParams)
      expect(response).toEqual(unauthorized(new UnmatchedPasswordError('any@mail.com').message))
    })

    it('Should return a 500 response if authenticator throws', async () => {
      mockAuthenticator.auth.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeAuthParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})
