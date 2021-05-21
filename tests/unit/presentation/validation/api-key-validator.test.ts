import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { ApiKeyValidator } from '@/presentation/validation/api-key-validator'

describe('ApiKey Validation', () => {
  const sut = new ApiKeyValidator()
  const error = new InvalidParamError('apiKey', 'Invalid service api key format')

  it('Should return an error if apiKey is too short', () => {
    const isValid = sut.validate({ apiKey: 'invalid_key' })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if receive a null apiKey', () => {
    const isValid = sut.validate({ apiKey: null })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if not receive a apiKey', () => {
    const isValid = sut.validate({})
    expect(isValid).toEqual(error)
  })

  it('Should return null if receive a valid apiKey', () => {
    const isValid = sut.validate({ apiKey: '_0uNvdW9q1jTXxNztB15vA90qTRgqe' })
    expect(isValid).toBeNull()
  })

  it('Should return an error if service is too short', () => {
    const isValid = sut.validate({ service: 'invalid_key' })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if receive a null service', () => {
    const isValid = sut.validate({ service: null })
    expect(isValid).toEqual(error)
  })

  it('Should return an error if not receive a service', () => {
    const isValid = sut.validate({})
    expect(isValid).toEqual(error)
  })

  it('Should return null if receive a valid service', () => {
    const isValid = sut.validate({ service: '_0uNvdW9q1jTXxNztB15vA90qTRgqe' })
    expect(isValid).toBeNull()
  })
})
