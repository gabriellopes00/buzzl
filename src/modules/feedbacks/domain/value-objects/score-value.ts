import { Either, left, right } from '@/shared/either'
import { InvalidScoreValueError } from './errors/invalid-score-value-error'

export class ScoreValue {
  private constructor(private readonly scoreValue: number) {
    Object.freeze(this)
  }

  get value(): string {
    return this.value
  }

  static create(scoreValue: number): Either<InvalidScoreValueError, ScoreValue> {
    if (!scoreValue || !ScoreValue.isValid(scoreValue)) {
      return left(new InvalidScoreValueError(scoreValue))
    }

    return right(new ScoreValue(scoreValue))
  }

  static isValid(scoreValue: number): boolean {
    return scoreValue >= 1 && scoreValue <= 10
  }
}
