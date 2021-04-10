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
})
