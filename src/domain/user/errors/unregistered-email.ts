export class UnregisteredEmailError extends Error {
  constructor(email: string) {
    super(`Received email: ${email} is not registered`)
    this.name = 'UnregisteredEmailError'
  }
}
