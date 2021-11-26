export class InvalidNameError extends Error {
  constructor(email: string) {
    super(`Name: ${email} is not valid`)
    this.name = this.constructor.name
    this.message = 'Names must have a minimum of 4 characters and a maximum of 255.'
  }
}
