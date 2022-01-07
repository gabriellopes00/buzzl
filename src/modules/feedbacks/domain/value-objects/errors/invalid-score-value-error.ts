export class InvalidScoreValueError extends Error {
  constructor(scoreValue: number) {
    super(`Score value: ${scoreValue} is not valid`)
    this.name = this.constructor.name
    this.message = 'Score value must be greater or equal to 1 and less or equal to 10'
  }
}
