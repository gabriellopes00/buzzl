import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { MissingParamError } from '@/presentation/validation/errors/missing-param-error'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'

describe('Required Fields Validation', () => {
  const sut = new ValidatorCompositor([
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password')
  ])

  it('Should return an error if any required field is missing', async () => {
    const error = sut.validate({ name: 'John Doe', email: 'johndoe@mail.com' })
    expect(error).toEqual(new MissingParamError('password'))
  })

  it('Should return null if all required fields are provided', async () => {
    const error = sut.validate({ name: 'John Doe', email: 'johndoe@mail.com', password: 'secret' })
    expect(error).toBeNull()
  })
})
