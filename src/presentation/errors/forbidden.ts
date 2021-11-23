export class ForbiddenError extends Error {
  constructor(message?: string) {
    super(`ForbiddenError: ${message}`)
    this.name = this.constructor.name
  }
}
