import { InvalidParamError } from '../errors/invalid-param-error'
import { Validator } from '../ports/validator'

export class EmailValidator implements Validator {
  validate(input: any): Error {
    if (input.email && typeof input.email === 'string') {
      const email: string = input.email
      const pattern = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

      if (email && email.length <= 256 && pattern.test(email)) return null

      if (email.includes('@') && email.includes('.')) {
        const [account, address] = email.split('@')
        if (account.length <= 64) return null

        const domain = address.split('.')
        if (domain.every(part => part.length <= 63)) return null
      }

      return new InvalidParamError('email', 'Emails must be in valid format')
    }
    return new InvalidParamError('email', 'Emails must be in valid format')
  }
}
