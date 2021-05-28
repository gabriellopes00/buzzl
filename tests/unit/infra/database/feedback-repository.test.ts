import { FeedbackModel } from '@/infra/database/models/feedback'
import { ServiceModel } from '@/infra/database/models/service'
import { UserModel } from '@/infra/database/models/user'
import pgConnectionHelper from '@/infra/database/pg-helper'
import { PgFeedbackRepository } from '@/infra/database/repositories/feedback-repository'
import { fakeFeedback } from '@t/mocks/feedback/feedback'
import { fakeService } from '@t/mocks/service/service'
import { fakeUser } from '@t/mocks/user/user'
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

  describe('Add Feedback', () => {
    it('Should store a feedback success', async () => {
      getRepository(UserModel).delete({})
      getRepository(ServiceModel).delete({})
      getRepository(FeedbackModel).delete({})

      await getRepository(UserModel).save(fakeUser)
      await getRepository(ServiceModel).save(fakeService)
      await sut.add(fakeFeedback)

      const { id } = await getRepository(FeedbackModel).findOne({ id: fakeFeedback.id })
      expect(id).toEqual(fakeFeedback.id)
    })

    it('Should not add a store a feedback if there is no respective service', async () => {
      const feedback = sut.add({ ...fakeFeedback, service: null })
      await expect(feedback).rejects.toThrow()
    })
  })

  describe('List All Feedbacks', () => {
    it('Should return all feedbacks on success', async () => {
      getRepository(UserModel).delete({})
      getRepository(ServiceModel).delete({})
      getRepository(FeedbackModel).delete({})

      await getRepository(UserModel).save(fakeUser)
      await getRepository(ServiceModel).save(fakeService)
      await getRepository(ServiceModel).save({ ...fakeService, id: 'id', apiKey: 'key' })

      await sut.add(fakeFeedback)
      await sut.add({ ...fakeFeedback, id: 'id', category: 'IDEA', service: 'key' })

      const data = await sut.findAll()
      expect(data).toEqual([
        expect.objectContaining(fakeFeedback),
        expect.objectContaining({ ...fakeFeedback, id: 'id', category: 'IDEA', service: 'key' })
      ])
    })

    it('Should return null if there is no feedbacks registered', async () => {
      getRepository(FeedbackModel).delete({})
      const data = await sut.findAll()
      expect(data).toBeNull()
    })

    it('Should return all feedbacks by service on success', async () => {
      getRepository(UserModel).delete({})
      getRepository(ServiceModel).delete({})
      getRepository(FeedbackModel).delete({})

      await getRepository(UserModel).save(fakeUser)
      await getRepository(ServiceModel).save(fakeService)
      await getRepository(ServiceModel).save({ ...fakeService, id: 'id', apiKey: 'any_key' })
      await sut.add(fakeFeedback)
      await sut.add({ ...fakeFeedback, id: 'id', category: 'IDEA', service: 'any_key' })

      const data = await sut.findAll({ service: 'any_key' })
      expect(data).toEqual([
        expect.objectContaining({ ...fakeFeedback, id: 'id', category: 'IDEA', service: 'any_key' })
      ])
    })

    it('Should return null if there is no feedback to received service key', async () => {
      getRepository(FeedbackModel).delete({})
      const data = await sut.findAll({ service: 'any_service' })
      expect(data).toBeNull()
    })
  })

  describe('Delete Feedback', () => {
    it('Should delete a feedback by id on success', async () => {
      getRepository(UserModel).delete({})
      getRepository(ServiceModel).delete({})
      getRepository(FeedbackModel).delete({})

      await getRepository(UserModel).save(fakeUser)
      await getRepository(ServiceModel).save(fakeService)
      const feedback = await getRepository(FeedbackModel).save(fakeFeedback)

      const { id } = await getRepository(FeedbackModel).findOne({ id: fakeFeedback.id })
      expect(id).toEqual(feedback.id)

      await sut.delete({ id })

      const deleted = await getRepository(FeedbackModel).findOne({ id: fakeFeedback.id })
      expect(deleted).toBeFalsy()
    })
  })

  describe('Find One Feedback', () => {
    it('Should return one feedback by id on success', async () => {
      getRepository(UserModel).delete({})
      getRepository(ServiceModel).delete({})
      getRepository(FeedbackModel).delete({})

      await getRepository(UserModel).save(fakeUser)
      await getRepository(ServiceModel).save(fakeService)
      const { id } = await getRepository(FeedbackModel).save(fakeFeedback)

      const data = await sut.findOne({ id })
      expect(data).toEqual(expect.objectContaining(fakeFeedback))
    })

    it('Should return null if there is no feedback with received id', async () => {
      getRepository(FeedbackModel).delete({})
      const data = await sut.findOne({ id: fakeFeedback.id })
      expect(data).toBeNull()
    })
  })
})
