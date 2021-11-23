export class InvalidAccessToken extends Error {
  constructor(token: string) {
    super(`Token: ${token} is not valid`)
    this.name = this.constructor.name
  }
}
