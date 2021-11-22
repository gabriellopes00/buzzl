import { InvalidParamError } from './errors/invalid-param-error'
import { Validator } from '../ports/validator'

export class RatingValidator implements Validator {
  validate(input: any): Error {
    if (typeof input.rating === 'number' && input.rating <= 10 && input.rating >= 1) return null
    else return new InvalidParamError('rating', 'Rating must be a number between 1 and 10')
  }
}
