import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { IDGenerator } from '@/infra/utils/uuid-generator'
import { AddServiceController } from '@/presentation/controllers/service/add-service'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { NameValidator } from '@/presentation/validation/name-validator'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { ServiceApiKeyGenerator } from '@/usecases/adapters/api-key-generator'
import { DbAddService } from '@/usecases/implementation/service/add-service'
import { getCustomRepository } from 'typeorm'
import { makeController } from './factory'

const requiredFieldsValidation = new RequiredFieldValidation(['name'])
const nameValidator = new NameValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, nameValidator])

const dbAddService = new DbAddService(
  new IDGenerator(),
  new ServiceApiKeyGenerator(),
  getCustomRepository(PgServiceRepository)
)

export const addServiceController = makeController(
  new AddServiceController(validator, dbAddService)
)
