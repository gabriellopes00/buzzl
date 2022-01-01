export class NonExistentServiceIdError extends Error {
  constructor(id: string) {
    super(`Id: ${id} is not assignable to any registered service`)
    this.name = this.constructor.name
  }
}
