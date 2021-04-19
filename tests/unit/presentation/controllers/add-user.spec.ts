import { AddUserController } from '@/presentation/controllers/add-user'
import { badRequest } from '@/presentation/helpers/http'
import { fakeUserParams } from '../../mocks/user'
import { MockValidator } from '../../mocks/validator'

describe('Add User Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const sut = new AddUserController(mockValidator)

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
  })
})
