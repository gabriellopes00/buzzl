import { MissingParamError } from '@/presentation/validation/errors/missing-param-error'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'

describe('Required Fields Validation', () => {
  it('Should return an error if is missing any param', () => {
    const sut = new RequiredFieldValidation('name')
    const error = sut.validate({ email: 'johndoe@mail.com', password: 'secret_pass' })
    expect(error).toEqual(new MissingParamError('name'))
  })

  it("Should return not return an error if receive 'false' as a parameter value", () => {
    const sut = new RequiredFieldValidation('isActive')
    const error = sut.validate({ isActive: false })
    expect(error).toBeNull()
  })

  it("Should return not return an error if receive '0' as a parameter value", () => {
    const sut = new RequiredFieldValidation('value')
    const error = sut.validate({ value: 0 })
    expect(error).toBeNull()
  })

  it('Should return null if all required fields are provided', () => {
    const sut = new RequiredFieldValidation('name')
    const params = { name: 'John Doe' }
    const error = sut.validate(params)
    expect(error).toBeNull()
  })
})
