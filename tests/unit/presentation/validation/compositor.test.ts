import { MockValidator } from '../../mocks/validator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { fakeUserParams } from '../../mocks/user'

describe('Validator Compositor', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockValidator2 = new MockValidator() as jest.Mocked<MockValidator>
  const sut = new ValidatorCompositor([mockValidator, mockValidator2])

  it('Should return an error if any validation fails', () => {
    jest.spyOn(mockValidator, 'validate').mockReturnValueOnce(new Error())
    const error = sut.validate(fakeUserParams)
    expect(error).toEqual(new Error())
  })

  it('Should return null if all validations succeeds', () => {
    const error = sut.validate(fakeUserParams)
    expect(error).toBeNull()
  })

  it('Should stop all validation on first failure', () => {
    jest.spyOn(mockValidator, 'validate').mockReturnValueOnce(new Error())
    const validate2 = jest.spyOn(mockValidator2, 'validate')

    sut.validate(fakeUserParams)
    expect(validate2).not.toBeCalled()
  })
})
