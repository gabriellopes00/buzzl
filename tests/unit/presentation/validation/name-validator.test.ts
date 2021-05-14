import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { NameValidator } from '@/presentation/validation/name-validator'

describe('Name Validation', () => {
  const sut = new NameValidator()
  const error = new InvalidParamError(
    'name',
    'Names must contain more than 2 characters and less than 255'
  )

  it('Should return an error if name too short', () => {
    const isValid = sut.validate({ name: 'Us' })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if receive a null name', () => {
    const isValid = sut.validate({ name: null })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if not receive a name', () => {
    const isValid = sut.validate({ name: null })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if not receive an name', () => {
    const isValid = sut.validate({})
    expect(isValid).toEqual(error)
  })

  it('Should return null if receive a valid name', () => {
    const isValid = sut.validate({ name: 'User Name' })
    expect(isValid).toBeNull()
  })
})
