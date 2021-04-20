import { Validator } from '../ports/validator'

export class ValidatorCompositor implements Validator {
  constructor(private readonly validators: Validator[]) {}

  validate(input: any): Error {
    for (const validation of this.validators) {
      const error = validation.validate(input)
      if (error) return error
    }
    return null
  }
}
