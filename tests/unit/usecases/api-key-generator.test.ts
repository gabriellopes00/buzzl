import { ServiceApiKeyGenerator } from '@/usecases/implementation/api-key-generator'

describe('Api Key Generator', () => {
  const sut = new ServiceApiKeyGenerator()

  it('Should generate a valid api key', () => {
    const apiKey = sut.generate()
    expect(apiKey).toEqual(expect.any(String))
    // apiKey pattern
    const pattern = /^_[a-z0-9A-Z]{29}$/
    expect(apiKey).toMatch(pattern)
  })
})
