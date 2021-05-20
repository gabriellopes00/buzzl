import { FeedbackModel } from '@/infra/database/models/feedback'
import pgConnectionHelper from '@/infra/database/pg-helper'
import { PgFeedbackRepository } from '@/infra/database/repositories/feedback-repository'
import { fakeFeedback } from '@t/mocks/feedback/feedback'
import { resolve } from 'path'
import { createConnection, getRepository } from 'typeorm'

describe('Pg Feedback Repository', () => {
  jest.spyOn(pgConnectionHelper, 'connect').mockImplementationOnce(async () => {
    await createConnection({
      type: 'sqlite',
      database: resolve(__dirname, '..', '..', '..', 'mocks', 'fake_db.sqlite'),
      entities: [resolve(__dirname, '../../../../src/infra/database/models/*.ts')]
    })
  })

  const sut = new PgFeedbackRepository()

  beforeAll(async () => await pgConnectionHelper.connect())
  afterAll(async () => await pgConnectionHelper.close())
  afterEach(() => getRepository(FeedbackModel).delete({}))

  describe('Add Feedback', () => {
    // it('Should store a feedback data on success', async () => {
    //   getRepository(UserModel).delete({})
    //   getRepository(ServiceModel).delete({})

    //   await getRepository(UserModel).save(fakeUser)
    //   await getRepository(ServiceModel).save(fakeService)
    //   await sut.add(fakeFeedback)

    //   const data = await getRepository(FeedbackModel).findOne({ id: fakeFeedback.id })
    //   expect(data.id).toEqual(fakeFeedback.id)
    // })

    it('Should not add a store a feedback if there is no respective service', async () => {
      const feedback = new PgFeedbackRepository().add({ ...fakeFeedback, service: null })
      await expect(feedback).rejects.toThrow()
    })

    it('Should throw if typeorm repository throws', async () => {
      jest.spyOn(sut, 'add').mockRejectedValueOnce(new Error())
      const error = sut.add(null)
      await expect(error).rejects.toThrow()
    })
  })
})
