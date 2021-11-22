import { InvalidParamError } from './errors/invalid-param-error'
import { Validator } from '../ports/validator'

export class FeedbackCategoryValidator implements Validator {
  public validate(input: any): Error {
    const error = new InvalidParamError('category', 'Invalid feedback category')

    switch (input.category) {
      case 'ISSUE':
        break

      case 'OTHER':
        break

      case 'IDEA':
        break

      case 'COMMENT':
        break

      default:
        return error
    }

    return null
  }
}
