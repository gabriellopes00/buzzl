export class UnregisteredFeedbackError extends Error {
  constructor(id: string) {
    super(`Received feedback id: ${id} is unregistered`)
    this.name = 'UnregisteredFeedbackError'
  }
}
