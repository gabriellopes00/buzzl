import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { PasswordValidator } from '@/presentation/validation/password-validator'

describe('Password Validation', () => {
  const sut = new PasswordValidator()
  const error = new InvalidParamError('password', 'Passwords must contain more than 3 characters')

  it('Should return an error if password is too short', () => {
    const isValid = sut.validate({ password: 'pas' })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if receive a null password', () => {
    const isValid = sut.validate({ password: null })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if not receive a password', () => {
    const isValid = sut.validate({})
    expect(isValid).toEqual(error)
  })

  it('Should return null if receive a valid password', () => {
    const isValid = sut.validate({ password: 'valid_password' })
    expect(isValid).toEqual(null)
  })
})
