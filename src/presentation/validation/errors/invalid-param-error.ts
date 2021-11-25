export class InvalidParamError extends Error {
  constructor(param: string) {
    super(`Invalid param: ${param}`)
    this.name = this.constructor.name
  }
}
