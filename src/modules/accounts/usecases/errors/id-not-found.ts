export class IdNotFoundError extends Error {
  constructor(id: string) {
    super(`Id: ${id} is not assigned to any account`)
    this.name = this.constructor.name
  }
}
