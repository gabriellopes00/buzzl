import 'module-alias/register'
import { PORT } from '@/config/env'
import logger from '@/config/logger'
import { getCustomRepository } from 'typeorm'
import { PsqlConnection } from '../infra/database/helpers/psql-helper'
import { PsqlUserRepository } from '../infra/database/repositories/user-repository'
import { DbAddUser } from '@/usecases/implementation/add-user'
import { IDGenerator } from '@/infra/uuid-generator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { UserValidator } from '@/presentation/validation/user'
import { AddUserController } from '@/presentation/controllers/add-user'

logger.info(PORT)
;(async () => {
  console.log('Starting process...')
  const psqlHelper = new PsqlConnection()
  await psqlHelper.connect()
  console.log('PG connected.')

  const conn = psqlHelper.getConnection()

  const usecase = new DbAddUser(new IDGenerator(), getCustomRepository(PsqlUserRepository))
  const requiredFields = new RequiredFieldValidation(['name', 'email', 'password'])
  const userValidation = new UserValidator()
  const validation = new ValidatorCompositor([requiredFields, userValidation])
  const controller = new AddUserController(validation, usecase)
  const createdUser = await controller.handle({
    name: 'Gabriel Lopes',
    email: 'gabriel@mail.com',
    password: 'mypass_'
  })

  console.log(createdUser)

  await conn.close()
  console.log('PG connection closed.')
})()
