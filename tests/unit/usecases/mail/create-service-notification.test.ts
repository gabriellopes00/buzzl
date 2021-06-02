import { DbCreateServiceNotification } from '@/usecases/mail/send-notification'
import { FakeMailProvider } from '@t/mocks/mail/create-service-notification'
import { fakeService } from '@t/mocks/service/service'

describe('Create Service Notification Mailing', () => {
  const mockMailProvider = new FakeMailProvider() as jest.Mocked<FakeMailProvider>
  const sut = new DbCreateServiceNotification(mockMailProvider)

  it('Should call email provider send method with correct values', async () => {
    const send = jest.spyOn(mockMailProvider, 'send')
    await sut.send(fakeService, 'user@mail.com')
    expect(send).toHaveBeenCalledWith(
      expect.any(String),
      'user@mail.com',
      expect.any(String),
      expect.any(String)
    )
  })

  it('Should throw if mail provider throws', async () => {
    mockMailProvider.send.mockRejectedValueOnce(new Error())
    const error = sut.send(fakeService, 'user@mail.com')
    await expect(error).rejects.toThrow()
  })
})
