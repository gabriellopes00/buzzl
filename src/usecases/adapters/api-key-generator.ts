import { ApiKeyGenerator } from '../ports/api-key-generator'

export class ServiceApiKeyGenerator implements ApiKeyGenerator {
  generate(): string {
    const characters = '0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ'
    const length = 29 // total length = 30
    let apiKey = '_'
    for (let i = 0; i < length; i++) {
      apiKey += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return apiKey
  }
}
