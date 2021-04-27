export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(`UnauthorizedError: ${message}`)
    this.name = 'UnauthorizedError'
  }
}
