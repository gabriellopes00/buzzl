import { Validator } from '@/core/presentation/validator'

export class MockedValidator implements Validator {
  validate(input: any): Error {
    return null
  }
}
