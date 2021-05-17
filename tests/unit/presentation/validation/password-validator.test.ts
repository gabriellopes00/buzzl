import { PasswordValidator } from '@/presentation/validation/password-validator'

describe('Password Validation', () => {
  const sut = new PasswordValidator()

  it('Should return an error if receive too short password', () => {
    const isValid = sut.validate({ password: 'pas' })
    expect(isValid).toBeInstanceOf(Error)
  })

  it('Should return an error if receive a null password', () => {
    const isValid = sut.validate({ password: null })
    expect(isValid).toBeInstanceOf(Error)
  })

  it('Should return an error if not receive a password', () => {
    const isValid = sut.validate({})
    expect(isValid).toBeInstanceOf(Error)
  })

  it('Should return null if receive a valid password', () => {
    const isValid = sut.validate({ password: 'valid_password' })
    expect(isValid).toBeNull()
  })
})
