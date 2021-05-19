import { Validator } from '@/presentation/ports/validator'

export class MockValidator implements Validator {
  validate(input: any): Error {
    return null
  }
}
