import { InvalidParamError } from '../errors/invalid-param-error'
import { Validator } from '../ports/validator'

export class ApiKeyValidator implements Validator {
  validate(input: any): Error {
    if (input.apiKey && typeof input.apiKey === 'string') {
      const pattern = /^_[a-z0-9A-Z]{29}$/
      if (pattern.test(input.apiKey)) return null
    } else if (input.service && typeof input.service === 'string') {
      const pattern = /^_[a-z0-9A-Z]{29}$/
      if (pattern.test(input.service)) return null
    }

    return new InvalidParamError('apiKey', 'Invalid service api key format')
  }
}
