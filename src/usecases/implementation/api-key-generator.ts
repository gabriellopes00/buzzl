import { ApiKeyGenerator } from '@/domain/usecases/service/api-key-generator'

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

// const asdf = new ServiceApiKeyGenerator()

// const pattern = /^\_[a-z0-9]{29}$/i
// for (let index = 0; index < 999; index++)
//   if (!pattern.test(asdf.generate())) console.log(asdf.generate().length)
// console.log(asdf.generate())
