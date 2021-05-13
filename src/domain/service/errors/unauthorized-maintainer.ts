export class UnauthorizedMaintainerError extends Error {
  constructor(apiKey: string, maintainerEmail: string) {
    super(`Key service: ${apiKey} is not maintained by ${maintainerEmail}.`)
    this.name = 'UnauthorizedMaintainerError'
  }
}
