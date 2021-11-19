import { FeedbackModel } from '@/infra/database/models/feedback'
import { ServiceModel } from '@/infra/database/models/service'
import { UserModel } from '@/infra/database/models/account'
import pgConnectionHelper from '@/infra/database/pg-helper'
import { fakeFeedback } from '@t/mocks/feedback/feedback'
import { fakeService } from '@t/mocks/service/service'
import { fakeUser } from '@t/mocks/user/user'
import { resolve } from 'path'
import { createConnection, getRepository } from 'typeorm'

describe('User Deletion Integration Tests', () => {
  jest.spyOn(pgConnectionHelper, 'connect').mockImplementationOnce(async () => {
    await createConnection({
      type: 'sqlite',
      database: resolve(__dirname, '..', '..', 'mocks', 'fake_db.sqlite'),
      entities: [resolve(__dirname, '../../../src/infra/database/models/*.ts')]
    })
  })

  beforeAll(async () => await pgConnectionHelper.connect())
  afterAll(async () => await pgConnectionHelper.close())

  it('Should remove a service if its maintainer is removed', async () => {
    const userRepo = getRepository(UserModel)
    const serviceRepo = getRepository(ServiceModel)

    userRepo.delete({})
    serviceRepo.delete({})

    const user = await userRepo.save(fakeUser)

    let service = await serviceRepo.save(fakeService)
    expect(service).toBeTruthy()

    userRepo.delete({ id: user.id })

    service = await serviceRepo.findOne({ id: service.id })
    expect(service).toBeFalsy()
  })

  it("Should remove a service and its feedbacks if service's maintainer is removed", async () => {
    const userRepo = getRepository(UserModel)
    const serviceRepo = getRepository(ServiceModel)
    const feedbackRepo = getRepository(FeedbackModel)

    userRepo.delete({})
    serviceRepo.delete({})
    feedbackRepo.delete({})

    await userRepo.save(fakeUser)

    let service = await serviceRepo.save(fakeService)
    expect(service).toBeTruthy()

    let feedback = await feedbackRepo.save(fakeFeedback)
    expect(feedback).toBeTruthy()

    userRepo.delete({ id: fakeUser.id })

    service = await serviceRepo.findOne({ id: service.id })
    expect(service).toBeFalsy()

    feedback = await feedbackRepo.findOne({ id: feedback.id })
    expect(feedback).toBeFalsy()
  })
})
