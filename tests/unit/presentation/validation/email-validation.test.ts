import { EmailValidator } from '@/presentation/validation/email-validator'
import { InvalidParamError } from '@/presentation/validation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/validation/errors/missing-param-error'

describe('Email Validation', () => {
  const sut = new EmailValidator('email')

  it('Should return an error if receive an invalid email', async () => {
    const error = sut.validate({ email: 'johndoe@mail.com' })
    expect(error).toBeNull()
  })

  it('Should return an error if receive an invalid email', async () => {
    let error = sut.validate({ email: 'johndoemail.com' })
    expect(error).toEqual(new InvalidParamError('email'))

    error = sut.validate({ email: 'johndoe@mailcom' })
    expect(error).toEqual(new InvalidParamError('email'))

    error = sut.validate({ email: `johndoe@${'d'.repeat(100)}.com` })
    expect(error).toEqual(new InvalidParamError('email'))

    error = sut.validate({ email: `johndoe@mail.${'d'.repeat(100)}` })
    expect(error).toEqual(new InvalidParamError('email'))

    error = sut.validate({ email: `${'n'.repeat(255)}@mail.com` })
    expect(error).toEqual(new InvalidParamError('email'))

    error = sut.validate({ email: undefined })
    expect(error).toEqual(new InvalidParamError('email'))
  })
})
