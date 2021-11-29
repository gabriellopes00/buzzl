import { Validator } from '@/core/presentation/validator'
import Joi from 'joi'

export class JoiValidator implements Validator {
  constructor(private readonly schema: Joi.Schema) {}

  validate(input: any): Error {
    return this.schema.validate(input, { stripUnknown: true }).error || null
  }
}
