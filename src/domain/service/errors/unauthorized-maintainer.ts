export class UnauthorizedMaintainerError extends Error {
  constructor(apiKey: string) {
    super(`Maintainer access denied for key service: ${apiKey}`)
    this.name = 'UnauthorizedMaintainerError'
  }
}
