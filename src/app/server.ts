import 'module-alias/register'
import { port } from '@/config/env'
import logger from '@/config/logger'
import { getRepository } from 'typeorm'

import { UserModel } from '../infra/database/models/user'
import { PsqlConnection } from '../infra/database/helpers/psql-helper'

logger.info(port)
;(async () => {
  console.log('Beginning dbseed task.')
  const psqlHelper = new PsqlConnection()
  await psqlHelper.connect()

  const conn = psqlHelper.getConn()
  console.log('PG connected.')

  // Create seed data.
  let patient = new UserModel()
  const patientRepo = getRepository(UserModel)
  patient = await patientRepo.save({ name: 'g', email: 'w@il.com', id: 'a', password: 'd' }) // re-assign to know assigned id
  console.log(`Patient saved. id = ${patient.id}`)

  // Close connection
  await conn.close()
  console.log('PG connection closed.')
})()
