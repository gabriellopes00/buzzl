export class ExistingEmailError extends Error {
  constructor(email: string) {
    super(`Email: ${email} is already in use`)
    this.name = this.constructor.name
  }
}
