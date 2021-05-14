export class UnmatchedPasswordError extends Error {
  constructor(email: string) {
    super(`Received password for ${email} is unmatched`)
    this.name = 'UnmatchedPasswordError'
  }
}
