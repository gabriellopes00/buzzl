import { InvalidParamError } from '@/presentation/validation/errors/invalid-param-error'
import { EmailValidator } from '@/presentation/validation/email-validator'

describe('Email Validation', () => {
  const sut = new EmailValidator()
  const error = new InvalidParamError('email', 'Emails must be in valid format')

  it('Should return an error if email is missing `@`', () => {
    const isValid = sut.validate({ email: 'invalidmail.com' })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if email is missing `.`', () => {
    const isValid = sut.validate({ email: 'invalid@mail' })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if receive a null email', () => {
    const isValid = sut.validate({ email: null })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if not receive an email', () => {
    const isValid = sut.validate({})
    expect(isValid).toEqual(error)
  })

  it('Should return null if receive a valid email', () => {
    const isValid = sut.validate({ email: 'valid@mail.com' })
    expect(isValid).toBeNull()
  })

  it('Should return an error if email is missing `@`', () => {
    const isValid = sut.validate({ newMaintainerEmail: 'invalidmail.com' })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if email is missing `.`', () => {
    const isValid = sut.validate({ newMaintainerEmail: 'invalid@mail' })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if receive a null email', () => {
    const isValid = sut.validate({ newMaintainerEmail: null })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if not receive an email', () => {
    const isValid = sut.validate({})
    expect(isValid).toEqual(error)
  })

  it('Should return null if receive a valid email', () => {
    const isValid = sut.validate({ newMaintainerEmail: 'valid@mail.com' })
    expect(isValid).toBeNull()
  })
})
