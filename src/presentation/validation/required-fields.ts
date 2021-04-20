import { MissingParamError } from '../errors/missing-param-error'
import { Validator } from '../ports/validator'

export class RequiredFieldValidation implements Validator {
  constructor(private readonly requiredFields: string[]) {}

  validate(input: any): Error {
    for (const field of this.requiredFields) {
      if (!input[field]) return new MissingParamError(field)
    }
    return null
  }
}
