export class UnregisteredApiKeyError extends Error {
  constructor(apiKey: string) {
    super(`Received apiKey: ${apiKey} is not registered`)
    this.name = 'UnregisteredApiKeyError'
  }
}
