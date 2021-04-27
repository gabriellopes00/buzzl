export class InvalidParamError extends Error {
  constructor(paramName: string, message?: string) {
    super(`Invalid param: ${paramName}. ${message}`)
    this.name = paramName
  }
}
