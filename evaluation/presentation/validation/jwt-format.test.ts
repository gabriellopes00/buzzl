import { JWTFormatValidator } from '@/presentation/validation/jwt-format'

describe('JWT Format Validation', () => {
  const sut = new JWTFormatValidator()

  it('Should return an error receive an invalid jwt token signature', () => {
    const err = sut.validate({ accessToken: false })
    expect(err).toBeInstanceOf(Error)
  })

  it('Should return an error if receive a null token', () => {
    const err = sut.validate({ accessToken: null })
    expect(err).toBeInstanceOf(Error)
  })

  it('Should return null if receive a valid token', () => {
    const err = sut.validate({
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ'
    })
    expect(err).toBeNull()
  })

  it('Should return an erro if receive an invalid token', () => {
    const err = sut.validate({ accessToken: 'invalid_token' })
    expect(err).toBeInstanceOf(Error)
  })
})
