import { InvalidParamError } from '../errors/invalid-param-error'
import { Validator } from '../ports/validator'

export class PasswordValidator implements Validator {
  validate(input: any): Error {
    if (input.password && typeof input.password === 'string' && input.password.length >= 4) {
      return null
    }

    return new InvalidParamError('password', 'Passwords must contain more than 3 characters')
  }
}
