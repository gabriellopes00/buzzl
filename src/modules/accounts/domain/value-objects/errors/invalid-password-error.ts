export class InvalidPasswordError extends Error {
  constructor(password: string) {
    super(`Password: ${password} is not in a valid format`)
    this.name = this.constructor.name
    this.message = 'Passwords must have a minimum of 4 characters and a maximum of 255.'
  }
}
