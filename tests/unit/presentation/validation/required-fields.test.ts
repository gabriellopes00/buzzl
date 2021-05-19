import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { fakeUserParams } from '@t/mocks/user/user'

describe('Required Fields Validation', () => {
  const sut = new RequiredFieldValidation(['name', 'email', 'password'])

  it('Should return an erro if is missing any param', () => {
    let error = sut.validate({ name: 'User Name', password: 'userpass_' })
    expect(error).toEqual(new MissingParamError('email'))

    error = sut.validate({ email: 'user@mail.com', password: 'userpass_' })
    expect(error).toEqual(new MissingParamError('name'))
  })

  it('Should return null if all required fields are provided', () => {
    const error = sut.validate(fakeUserParams)
    expect(error).toBeNull()
  })
})
