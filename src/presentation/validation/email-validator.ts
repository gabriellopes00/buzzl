import { Validator } from '@/core/presentation/validator'
import { InvalidParamError } from './errors/invalid-param-error'

export class EmailValidator implements Validator {
  constructor(private readonly emailField: string) {}

  validate(input: any): Error {
    const email = input[this.emailField]
    const pattern =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (!email || email.length > 256 || !pattern.test(email)) {
      return new InvalidParamError('email')
    }

    const [account, address] = email.split('@')
    if (account.length > 64) {
      return new InvalidParamError('email')
    }

    const domain = address.split('.')
    if (domain.some(part => part.length > 63)) {
      return new InvalidParamError('email')
    }

    return null
  }
}
