export class ExistingEmailError extends Error {
  constructor(email: string) {
    super(`Received email: ${email} is already in use`)
    this.name = 'ExistingEmailError'
  }
}
