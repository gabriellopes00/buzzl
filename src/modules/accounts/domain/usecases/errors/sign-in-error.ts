export class SignInError extends Error {
  constructor() {
    super('Invalid email or password')
    this.name = this.constructor.name
  }
}
