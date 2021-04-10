import { UserValidation } from '@/implementation/validation/user'

describe('User Validation', () => {
  const sut = new UserValidation()

  it('Should validate correctly a name', () => {
    let isValid = sut.validateName('Us')
    expect(isValid).toBeFalsy()

    isValid = sut.validateName(null)
    expect(isValid).toBeFalsy()

    isValid = sut.validateName('User Name')
    expect(isValid).toBeTruthy()
  })

  it('Should validate correctly an email', () => {
    let isValid = sut.validateEmail('invalidmail.com')
    expect(isValid).toBeFalsy()

    isValid = sut.validateEmail('invalid@mail')
    expect(isValid).toBeFalsy()

    isValid = sut.validateEmail(null)
    expect(isValid).toBeFalsy()

    isValid = sut.validateEmail('user@mail.com')
    expect(isValid).toBeTruthy()
  })

  it('Should validate correctly an password', () => {
    let isValid = sut.validatePassword('aaa')
    expect(isValid).toBeFalsy()

    isValid = sut.validatePassword(null)
    expect(isValid).toBeFalsy()

    isValid = sut.validatePassword('_userpass')
    expect(isValid).toBeTruthy()
  })

  it('Should validate correctly an UUID', () => {
    let isValid = sut.validateId('invalid_uuid')
    expect(isValid).toBeFalsy()

    isValid = sut.validateId(null)
    expect(isValid).toBeFalsy()

    isValid = sut.validateId('bc7d7468-0fce-468c-8a02-587bc1eb9f77')
    expect(isValid).toBeTruthy()
  })
})
