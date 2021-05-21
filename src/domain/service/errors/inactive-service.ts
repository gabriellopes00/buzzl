export class InactiveServiceError extends Error {
  constructor(apiKey: string) {
    super(`Key service: ${apiKey} is currently inactive`)
    this.name = 'InactiveServiceError'
  }
}
