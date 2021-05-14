export class UnauthorizedUserDeletionError extends Error {
  constructor(email: string) {
    super(`Unauthorized deletion for user with email: ${email}`)
    this.name = 'UnauthorizedUserDeletionError'
  }
}
