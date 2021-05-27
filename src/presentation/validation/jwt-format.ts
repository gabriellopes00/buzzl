import { Validator } from '../ports/validator'

export class JWTFormatValidator implements Validator {
  public validate(input: any): Error {
    if (typeof input.accessToken === 'string') {
      const pattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
      const isValid = pattern.test(input.accessToken)
      return !isValid ? new Error('Invalid JWT signature') : null
    } else return new Error('Invalid JWT token signature')
  }
}
