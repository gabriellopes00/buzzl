export class ConnectionError extends Error {
  constructor(message: string) {
    super(`Connection error: ${message}`)
    this.name = 'ConnectionError'
  }
}
