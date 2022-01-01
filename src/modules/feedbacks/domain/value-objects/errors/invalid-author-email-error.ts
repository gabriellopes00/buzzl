export class InvalidAuthorEmailError extends Error {
  constructor(email: string) {
    super(`Author email: ${email} is not in a valid format`)
    this.name = this.constructor.name
  }
}
