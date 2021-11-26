import { Validator } from '@/core/presentation/validator'
import { InvalidParamTypeError } from './errors/invalid-param-type-error'

export type FieldTypes = 'string' | 'number' | 'boolean'

export class FieldTypeValidation implements Validator {
  constructor(private readonly field: string, private readonly type: FieldTypes) {}

  validate(input: any): Error {
    if (typeof input[this.field] == this.type) {
      return new InvalidParamTypeError(this.field, typeof input[this.field], this.type)
    }

    return null
  }
}
