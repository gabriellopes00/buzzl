import { UnauthorizedUserDeletionError } from '@/domain/user/errors/unauthorized-deletion'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { DeleteUserController, DeleteUserParams } from '@/presentation/controllers/user/delete-user'
import {
  badRequest,
  conflict,
  noContent,
  serverError,
  unauthorized
} from '@/presentation/helpers/http'
import { MockValidator } from '@t/mocks/common/validator'
import { MockDeleteUser } from '@t/mocks/user/usecases'
import { fakeUser } from '@t/mocks/user/user'

describe('Delete User Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockDeleteUser = new MockDeleteUser() as jest.Mocked<MockDeleteUser>
  const sut = new DeleteUserController(mockValidator, mockDeleteUser)
  const fakeParams: DeleteUserParams = { email: fakeUser.email, userId: fakeUser.id }

  describe('Validation', () => {
    it('Should call validator before call deleteUser usecase with correct values', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const del = jest.spyOn(mockDeleteUser, 'delete')
      await sut.handle(fakeParams)

      expect(validate).toHaveBeenCalledWith(fakeParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const delCall = del.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(delCall)
    })

    it('Should return an 400 response if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(badRequest(new Error()))
    })

    it('Should return a 500 response if validation throws', async () => {
      mockValidator.validate.mockImplementationOnce(() => {
        throw new Error()
      })
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })

  describe('Delete User Usecase', () => {
    it('Should not call deleteUser usecase if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const del = jest.spyOn(mockDeleteUser, 'delete')
      await sut.handle(fakeParams)
      expect(del).not.toHaveBeenCalled()
    })

    it('Should return 409 if receive an unregistered email', async () => {
      mockDeleteUser.delete.mockResolvedValueOnce(new UnregisteredEmailError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(conflict(new UnregisteredEmailError('')))
    })

    it('Should return 401 if receive request from invalid user', async () => {
      mockDeleteUser.delete.mockResolvedValueOnce(new UnauthorizedUserDeletionError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(unauthorized(new UnauthorizedUserDeletionError('')))
    })

    it('Should return 204 on success', async () => {
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(noContent())
    })

    it('Should return a 500 response if deleteUser throws', async () => {
      mockDeleteUser.delete.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})
