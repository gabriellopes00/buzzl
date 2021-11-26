export class InvalidParamTypeError extends Error {
  constructor(param: string, received: string, expected: string) {
    super(`Invalid param type for: ${param}. Expected: ${expected}, but received: ${received}`)
    this.name = this.constructor.name
  }
}
