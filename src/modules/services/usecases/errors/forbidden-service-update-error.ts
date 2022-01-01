export class ForbiddenServiceUpdateError extends Error {
  constructor() {
    super(`Services updates can only be done by it's owners`)
    this.name = this.constructor.name
  }
}
