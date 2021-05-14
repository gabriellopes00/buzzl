import { InvalidParamError } from '../errors/invalid-param-error'
import { Validator } from '../ports/validator'

export class ApiKeyValidator implements Validator {
  validate(input: any): Error {
    if (input.apiKey && typeof input.apiKey === 'string') {
      const pattern = /^_[a-z0-9A-Z]{29}$/
      if (pattern.test(input.apiKey)) return null
    }

    return new InvalidParamError('apiKey', 'Invalid api key format')
  }
}
