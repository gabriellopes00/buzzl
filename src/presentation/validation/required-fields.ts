import { Validator } from '@/core/presentation/validator'
import { MissingParamError } from './errors/missing-param-error'

export class RequiredFieldValidation implements Validator {
  constructor(private readonly field: string) {}

  validate(input: any): Error {
    if (input[this.field] === undefined) return new MissingParamError(this.field)
    return null
  }
}
