export class ServiceIdNotFound extends Error {
  constructor(id: string) {
    super(`Service Id: ${id} not found.`)
    this.name = this.constructor.name
  }
}
