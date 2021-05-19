export class InvalidServiceTransferError extends Error {
  constructor(apiKey: string, newMaintainerEmail: string) {
    super(`User ${newMaintainerEmail} is already the maintainer of the key service: ${apiKey}`)
    this.name = 'InvalidServiceTransferError'
  }
}
