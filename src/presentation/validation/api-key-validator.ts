import { InvalidParamError } from '../errors/invalid-param-error'
import { Validator } from '../ports/validator'

export class ApiKeyValidator implements Validator {
  validate(input: any): Error {
    const pattern = /^_[a-z0-9A-Z]{29}$/
    if (pattern.test(input.apiKey) || pattern.test(input.service)) return null

    return new InvalidParamError('apiKey', 'Invalid service api key format')
  }
}
