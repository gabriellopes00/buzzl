import { UnmatchedPasswordError } from '@/domain/user/errors/unmatched-password'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { SignInController } from '@/presentation/controllers/user/sign-in'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { MockSignIn } from '@t/mocks/user/sign-in'
import { fakeSignInParams } from '@t/mocks/user/user'
import { MockValidator } from '@t/mocks/common/validator'

describe('Sign In User Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockSignIn = new MockSignIn() as jest.Mocked<MockSignIn>
  const sut = new SignInController(mockValidator, mockSignIn)

  describe('Validation', () => {
    it('Should call validator with received request data', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      await sut.handle(fakeSignInParams)
      expect(validate).toHaveBeenCalledWith(fakeSignInParams)
    })

    it('Should return an 400 response if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const response = await sut.handle(fakeSignInParams)
      expect(response).toEqual(badRequest(new Error()))
    })

    it('Should return a 500 response if signin throws', async () => {
      mockValidator.validate.mockImplementationOnce(() => {
        throw new Error()
      })
      const response = await sut.handle(fakeSignInParams)
      expect(response).toEqual(serverError(new Error()))
    })

    it('Should call validator before call signin usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const signin = jest.spyOn(mockSignIn, 'sign')
      await sut.handle(fakeSignInParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const signinCall = signin.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(signinCall)
    })
  })

  describe('Sign In', () => {
    it('Should call signin with correct values', async () => {
      const signin = jest.spyOn(mockSignIn, 'sign')
      await sut.handle(fakeSignInParams)
      expect(signin).toHaveBeenCalledWith(fakeSignInParams)
    })

    it('Should return a 200 response with created and signed in user data', async () => {
      const response = await sut.handle(fakeSignInParams)
      expect(response).toEqual(ok({ accessToken: expect.any(String) }))
    })

    it('Should return a 400 if received email is not registered', async () => {
      mockSignIn.sign.mockResolvedValueOnce(new UnregisteredEmailError('any@mail.com'))
      const response = await sut.handle(fakeSignInParams)
      expect(response).toEqual(badRequest(new UnregisteredEmailError('any@mail.com')))
    })

    it('Should return a 401 if received unmatched password for respective email', async () => {
      mockSignIn.sign.mockResolvedValueOnce(new UnmatchedPasswordError('any@mail.com'))
      const response = await sut.handle(fakeSignInParams)
      expect(response).toEqual(unauthorized(new UnmatchedPasswordError('any@mail.com')))
    })

    it('Should return a 500 response if signin throws', async () => {
      mockSignIn.sign.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeSignInParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})
