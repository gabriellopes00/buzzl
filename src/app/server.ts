import 'module-alias/register'
import { PORT } from '@/config/env'
import logger from '@/config/logger'
import { getCustomRepository } from 'typeorm'
import { PsqlConnection } from '../infra/database/helpers/psql-helper'
import { PsqlUserRepository } from '../infra/database/repositories/user-repository'
import { DbAddUser } from '@/usecases/implementation/add-user'
import { IDGenerator } from '@/infra/uuid-generator'

logger.info(PORT)
;(async () => {
  console.log('Starting process...')
  const psqlHelper = new PsqlConnection()
  await psqlHelper.connect()
  console.log('PG connected.')

  const conn = psqlHelper.getConnection()

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
