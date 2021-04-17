import 'module-alias/register'
import { port } from '@/config/env'
import logger from '@/config/logger'
import { getCustomRepository } from 'typeorm'
import { PsqlConnection } from '../infra/database/helpers/psql-helper'
import { PsqlUserRepository } from '../infra/database/repositories/user-repository'
import { DbAddUser } from '@/usecases/implementation/add-user'
import { IDGenerator } from '@/infra/uuid-generator'

logger.info(port)
// ;(async () => {
//   console.log('Beginning dbseed task.')
//   const psqlHelper = new PsqlConnection()
//   await psqlHelper.connect()

//   const conn = psqlHelper.getConn()
//   console.log('PG connected.')

//   // Create seed data.
//   // let patient = new UserModel()

//   const patientRepo = getCustomRepository(PsqlUserRepository)
//   const patient = await patientRepo.exists('gabriel@mail.commm') // re-assign to know assigned id
//   console.log(`${patient}`)

//   // Close connection
//   await conn.close()
//   console.log('PG connection closed.')
// })()
;(async () => {
  console.log('Starting process...')
  const psqlHelper = new PsqlConnection()
  const conn = psqlHelper.getConn()
  console.log(conn)
  await psqlHelper.connect()

  console.log('PG connected.')

  const usecase = new DbAddUser(new IDGenerator(), getCustomRepository(PsqlUserRepository))

  const createdUser = await usecase.add({
    name: 'Gabriel Lopes',
    email: 'gabriel@mail.com',
    password: 'mypass_'
  })

  console.log(createdUser)

  await conn.close()
  console.log('PG connection closed.')
})()
