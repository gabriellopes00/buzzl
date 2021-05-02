import { ExistingEmailError } from '@/domain/usecases/errors/user/existing-email'
import { AddUserController, AddUserResponse } from '@/presentation/controllers/add-user'
import { badRequest, conflict, created, serverError } from '@/presentation/helpers/http'
import { MockAddUser } from '../../../mocks/add-user'
import { fakeAuthParams, fakeUser, fakeUserParams } from '../../../mocks/user'
import { MockAuthenticator } from '../../../mocks/user-authenticator'
import { MockValidator } from '../../../mocks/validator'

describe('Add User Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockAddUser = new MockAddUser() as jest.Mocked<MockAddUser>
  const mockAuthenticator = new MockAuthenticator() as jest.Mocked<MockAuthenticator>
  const sut = new AddUserController(mockValidator, mockAddUser, mockAuthenticator)

  describe('Validation', () => {
    it('Should call validator with received request data', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      await sut.handle(fakeUserParams)
      expect(validate).toHaveBeenCalledWith(fakeUserParams)
    })

    it('Should return an 400 response if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const response = await sut.handle(fakeUserParams)
      expect(response).toEqual(badRequest(new Error()))
    })

    it('Should call validator before call addUser usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const add = jest.spyOn(mockAddUser, 'add')
      await sut.handle(fakeUserParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const addCall = add.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(addCall)
    })
  })

  describe('AddUser Usecase', () => {
    it('Should not call addUser usecase if validation fails', async () => {
      const add = jest.spyOn(mockAddUser, 'add')
      mockValidator.validate.mockReturnValueOnce(new Error())
      await sut.handle(fakeUserParams)
      expect(add).not.toHaveBeenCalled()
    })

    it('Should return a 409 response if received email is already in use', async () => {
      mockAddUser.add.mockResolvedValueOnce(new ExistingEmailError('any@mail.com'))
      const response = await sut.handle(fakeUserParams)
      expect(response).toEqual(conflict(new ExistingEmailError('any@mail.com')))
    })

    it('Should return a 500 response if addUser throws', async () => {
      mockAddUser.add.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeUserParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })

  describe('Authentication', () => {
    it('Should call authenticator with correct values', async () => {
      const auth = jest.spyOn(mockAuthenticator, 'auth')
      await sut.handle(fakeUserParams)
      expect(auth).toHaveBeenCalledWith(fakeAuthParams)
    })

    it('Should return a 201 response with created and authenticated user data', async () => {
      const response = await sut.handle(fakeUserParams)
      const { id, name, email } = fakeUser
      expect(response).toEqual(
        created<AddUserResponse>({ user: { id, email, name }, accessToken: expect.any(String) })
      )
    })

    it('Should return a 500 response if addUser throws', async () => {
      mockAuthenticator.auth.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeUserParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})
