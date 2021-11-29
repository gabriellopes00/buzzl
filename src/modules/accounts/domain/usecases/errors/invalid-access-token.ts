export class InvalidAccessToken extends Error {
  constructor() {
    super(`Invalid access token is not valid`)
    this.name = this.constructor.name
  }
}
