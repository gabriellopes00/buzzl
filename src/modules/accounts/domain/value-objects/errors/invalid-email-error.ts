export class InvalidEmailError extends Error {
  constructor(email: string) {
    super(`Email: ${email} is not in a valid format`)
    this.name = this.constructor.name
  }
}
