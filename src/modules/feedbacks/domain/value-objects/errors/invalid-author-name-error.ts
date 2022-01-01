export class InvalidAuthorNameError extends Error {
  constructor(name: string) {
    super(`Author name: ${name} is not valid`)
    this.name = this.constructor.name
    this.message = 'Names must have a minimum of 4 characters and a maximum of 255.'
  }
}
