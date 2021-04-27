import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { UserValidator } from '@/presentation/validation/user'
import { fakeUserParams } from '../../mocks/user'

describe('User Validation', () => {
  const sut = new UserValidator()

  it('Should validate correctly a name', () => {
    let isValid = sut.validate({ ...fakeUserParams, name: 'Us' })
    expect(isValid).toEqual(new InvalidParamError('name'))

    isValid = sut.validate({ ...fakeUserParams, name: null })
    expect(isValid).toEqual(new InvalidParamError('name'))
  })

  it('Should validate correctly an email', () => {
    let isValid = sut.validate({ ...fakeUserParams, email: 'invalidemail.com' })
    expect(isValid).toEqual(new InvalidParamError('email'))

    isValid = sut.validate({ ...fakeUserParams, email: 'invalid@mail' })
    expect(isValid).toEqual(new InvalidParamError('email'))

    isValid = sut.validate({ ...fakeUserParams, email: null })
    expect(isValid).toEqual(new InvalidParamError('email'))
  })

  it('Should validate correctly an password', () => {
    let isValid = sut.validate({ ...fakeUserParams, password: 'pas' })
    expect(isValid).toEqual(new InvalidParamError('password'))

    isValid = sut.validate({ ...fakeUserParams, password: null })
    expect(isValid).toEqual(new InvalidParamError('password'))
  })

  it('Should validate correctly all user data', () => {
    let isValid = sut.validate({} as null)
    expect(isValid).toEqual(new InvalidParamError('name')) // fail in the first validation

    isValid = sut.validate(fakeUserParams) // success case
    expect(isValid).toBeNull()
  })
})
