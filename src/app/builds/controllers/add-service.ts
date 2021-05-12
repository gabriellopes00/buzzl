import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { ServiceAPIKeyGenerator } from '@/infra/utils/api-key-generator'
import { IDGenerator } from '@/infra/utils/uuid-generator'
import { AddServiceController } from '@/presentation/controllers/service/add-service'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { NameValidator } from '@/presentation/validation/name-validator'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbAddService } from '@/usecases/service/add-service'
import { makeController } from './factory'

const requiredFieldsValidation = new RequiredFieldValidation(['name'])
const nameValidator = new NameValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, nameValidator])

const dbAddService = new DbAddService(
  new IDGenerator(),
  new ServiceAPIKeyGenerator(),
  new PgServiceRepository()
)

export const addServiceController = makeController(
  new AddServiceController(validator, dbAddService)
)
