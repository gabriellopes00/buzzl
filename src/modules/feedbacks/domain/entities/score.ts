import { Either, left, right } from '@/shared/either'
import { Entity } from '@/shared/entity'
import { InvalidScoreValueError } from '../value-objects/errors/invalid-score-value-error'
import { ScoreValue } from '../value-objects/score-value'

export interface ScoreData {
  value: number
  serviceId: string
}

export interface ScoreErrors extends InvalidScoreValueError {}

export class Score extends Entity<ScoreData> {
  get id() {
    return this._id
  }

  get serviceId() {
    return this.data.serviceId
  }

  get value() {
    return this.data.value
  }

  get createdAt() {
    return this._createdAt
  }

  private constructor(data: ScoreData, id: string) {
    super(data, id)
  }

  static create(data: ScoreData, id: string): Either<ScoreErrors, Score> {
    const valueResult = ScoreValue.create(data.value)
    if (valueResult.isLeft()) return left(valueResult.value)

    const score = new Score(data, id)
    return right(score)
  }

  static adapt(data: ScoreData & { id: string }): Score {
    return new Score(data, data.id)
  }
}
