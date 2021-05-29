import { FeedbackModel } from '@/infra/database/models/feedback'
import { ServiceModel } from '@/infra/database/models/service'
import { UserModel } from '@/infra/database/models/user'
import pgConnectionHelper from '@/infra/database/pg-helper'
import { fakeFeedback } from '@t/mocks/feedback/feedback'
import { fakeService } from '@t/mocks/service/service'
import { fakeUser } from '@t/mocks/user/user'
import { resolve } from 'path'
import { createConnection, getRepository } from 'typeorm'

describe('Service ApiKey Regeneration Integration Tests', () => {
  jest.spyOn(pgConnectionHelper, 'connect').mockImplementationOnce(async () => {
    await createConnection({
      type: 'sqlite',
      database: resolve(__dirname, '..', '..', 'mocks', 'fake_db.sqlite'),
      entities: [resolve(__dirname, '../../../src/infra/database/models/*.ts')]
    })
  })

  beforeAll(async () => await pgConnectionHelper.connect())
  afterAll(async () => await pgConnectionHelper.close())

  it('Should update all feedbacks to use new service api key', async () => {
    const userRepo = getRepository(UserModel)
    const serviceRepo = getRepository(ServiceModel)
    const feedbackRepo = getRepository(FeedbackModel)

    userRepo.delete({})
    serviceRepo.delete({})
    feedbackRepo.delete({})

    await userRepo.save(fakeUser)
    let { apiKey } = await serviceRepo.save(fakeService)
    const feedback = await feedbackRepo.save(fakeFeedback)
    expect(feedback.service).toEqual(apiKey)

    apiKey = (await serviceRepo.save({ ...fakeService, apiKey: '_4tj4G4Yfg02hwy' })).apiKey

    const updated = await feedbackRepo.findOne({ where: { service: apiKey } })
    expect(updated.id).toEqual(feedback.id)
  })
})
