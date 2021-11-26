export class ApiKey {
  private constructor() {
    Object.freeze(this)
  }

  private key: string = null

  get value(): string {
    return this.key
  }

  static generate(): string {
    const characters = '0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ'
    const length = 30
    let apiKey = '_'

    for (let i = apiKey.length; i < length; i++) {
      apiKey += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return apiKey
  }
}
