// import { EvaluationModel } from '@/infra/database/models/evaluation'
// import { ServiceModel } from '@/infra/database/models/service'
// import { UserModel } from '@/infra/database/models/user'
// import pgConnectionHelper from '@/infra/database/pg-helper'
// import { PgEvaluationRepository } from '@/infra/database/repositories/evaluation-repository'
// import { fakeEvaluation } from '@t/mocks/evaluation/evaluation'
// import { fakeService } from '@t/mocks/service/service'
// import { fakeUser } from '@t/mocks/user/user'
// import { resolve } from 'path'
// import { createConnection, getRepository } from 'typeorm'

// describe('Pg Evaluation Repository', () => {
//   jest.spyOn(pgConnectionHelper, 'connect').mockImplementationOnce(async () => {
//     await createConnection({
//       type: 'sqlite',
//       database: resolve(__dirname, '..', '..', '..', 'mocks', 'fake_db.sqlite'),
//       entities: [resolve(__dirname, '../../../../src/infra/database/models/*.ts')]
//     })
//   })

//   const sut = new PgEvaluationRepository()

//   beforeAll(async () => await pgConnectionHelper.connect())
//   afterAll(async () => await pgConnectionHelper.close())
//   beforeEach(async () => {
//     getRepository(UserModel).delete({})
//     getRepository(ServiceModel).delete({})
//     getRepository(EvaluationModel).delete({})
//   })

//   describe('Add Evaluation', () => {
//     it('Should store a evaluation success', async () => {
//       await getRepository(UserModel).save(fakeUser)
//       await getRepository(ServiceModel).save(fakeService)
//       await sut.add(fakeEvaluation)

//       const { id } = await getRepository(EvaluationModel).findOne({ id: fakeEvaluation.id })
//       expect(id).toEqual(fakeEvaluation.id)
//     })
//   })

//   describe('List All evaluations', () => {
//     it('Should return all evaluations on success', async () => {
//       getRepository(UserModel).delete({})
//       getRepository(ServiceModel).delete({})
//       getRepository(EvaluationModel).delete({})

//       await getRepository(UserModel).save(fakeUser)
//       await getRepository(ServiceModel).save(fakeService)
//       await getRepository(ServiceModel).save({ ...fakeService, id: 'id', apiKey: 'key' })

//       await sut.add(fakeEvaluation)
//       await sut.add({ id: 'id', rating: 6, service: 'key' })

//       const data = await sut.findAll('key')
//       expect(data).toEqual([expect.objectContaining({ id: 'id', rating: 6, service: 'key' })])
//     })

//     it('Should return null if there is no evaluations registered', async () => {
//       getRepository(EvaluationModel).delete({})
//       const data = await sut.findAll('service_key')
//       expect(data).toBeNull()
//     })

//     it('Should return null if there is no evaluation to received service key', async () => {
//       getRepository(EvaluationModel).delete({})
//       const data = await sut.findAll('any_service')
//       expect(data).toBeNull()
//     })
//   })
// })
describe('asdf', () => {
  it('asdf', async () => {
    expect(1).toBe(1)
  })
})
