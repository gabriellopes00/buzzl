import { LogDecorator } from '@/app/decorators/log-decorator'
import { Controller } from '@/presentation/ports/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

describe('Log Decorator', () => {
  class MockController implements Controller {
    async handle(request: any): Promise<HttpResponse> {
      return { body: new Error('fake_error'), code: 500 }
    }
  }

  const mockController = new MockController()
  const mockDecorator = new LogDecorator(mockController)
  beforeEach(() =>
    writeFileSync(resolve(__dirname, '..', '..', '..', 'etc', 'logs', 'internal-errors.log'), '')
  )

  it('Should log an error if controller throws', async () => {
    await mockDecorator.handle('')
    const data = readFileSync(
      resolve(__dirname, '..', '..', '..', 'etc', 'logs', 'internal-errors.log')
    )
    expect(data.indexOf('fake_error')).not.toBe(-1)
  })

  it('Should not log an error if controller succeeds', async () => {
    jest.spyOn(mockController, 'handle').mockResolvedValueOnce({ code: 200, body: 'success' })
    await mockDecorator.handle('')
    const logError = readFileSync(
      resolve(__dirname, '..', '..', '..', 'etc', 'logs', 'internal-errors.log')
    )
    expect(logError.toString().indexOf('fake_error')).toBe(-1)
  })
})
