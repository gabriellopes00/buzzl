import { Validator } from '@/core/presentation/validator'

export class ValidatorCompositor implements Validator {
  constructor(private readonly validators: Validator[]) {}

  validate(input: any): Error {
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) return error
    }
    return null
  }
}
