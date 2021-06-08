import { InvalidParamError } from '../errors/invalid-param-error'
import { Validator } from '../ports/validator'

export class NameValidator implements Validator {
  validate(input: any): Error {
    if (input.name && typeof input.name === 'string') {
      if (input.name && input.name.trim().length > 2 && input.name.trim().length <= 255) return null
    }
    return new InvalidParamError(
      'name',
      'Names must contain more than 2 characters and less than 255'
    )
  }
}
