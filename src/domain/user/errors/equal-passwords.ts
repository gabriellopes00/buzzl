export class EqualPasswordError extends Error {
  constructor() {
    super('New password can not be equal to the current')
    this.name = 'EqualPasswordError'
  }
}
