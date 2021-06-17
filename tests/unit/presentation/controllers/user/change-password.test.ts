import { EqualPasswordError } from '@/domain/user/errors/equal-passwords'
import { UnmatchedPasswordError } from '@/domain/user/errors/unmatched-password'
import { ChangePassController } from '@/presentation/controllers/user/change-password'
import { badRequest, conflict, noContent, serverError } from '@/presentation/helpers/http'
import { MockValidator } from '@t/mocks/common/validator'
import { MockChangePass } from '@t/mocks/user/change-password'
import { fakeUser } from '@t/mocks/user/user'

describe('Change Password Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockChangePass = new MockChangePass() as jest.Mocked<MockChangePass>
  const sut = new ChangePassController(mockValidator, mockChangePass)

  const fakeParams = { userId: fakeUser.id, newPass: '_newpass', currentPass: 'pass' }

  describe('Validation', () => {
    it('Should call validator before call changePass usecase with correct values', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const change = jest.spyOn(mockChangePass, 'change')
      await sut.handle(fakeParams)

      expect(validate).toHaveBeenCalledWith(fakeParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const changeCall = change.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(changeCall)
    })

    it('Should return an 400 response if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(badRequest(new Error()))
    })

    it('Should return a 500 response if validator throws', async () => {
      mockValidator.validate.mockImplementationOnce(() => {
        throw new Error('')
      })
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })

  describe('ChangePass Usecase', () => {
    it('Should not call changePass usecase if validation fails', async () => {
      const change = jest.spyOn(mockChangePass, 'change')
      mockValidator.validate.mockReturnValueOnce(new Error())
      await sut.handle(fakeParams)
      expect(change).not.toHaveBeenCalled()
    })

    it('Should return a 409 response if received an invalid password', async () => {
      mockChangePass.change.mockResolvedValueOnce(new UnmatchedPasswordError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(conflict(new UnmatchedPasswordError('')))
    })

    it('Should return a 409 response if received an equal password', async () => {
      mockChangePass.change.mockResolvedValueOnce(new EqualPasswordError())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(conflict(new EqualPasswordError()))
    })

    it('Should return a 204 response if change password on success', async () => {
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(noContent())
    })

    it('Should return a 500 response if changeUser throws', async () => {
      mockChangePass.change.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})
