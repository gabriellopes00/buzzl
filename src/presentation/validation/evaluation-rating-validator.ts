import { InvalidParamError } from './errors/invalid-param-error'
import { Validator } from '../ports/validator'

export class EvaluationRatingValidator implements Validator {
  public validate(input: any): Error {
    const rating = input.rating
    if (rating && rating >= 0 && rating <= 10) return null
    else return new InvalidParamError('rating', 'Evaluation rating out of range 0-10')
  }
}
