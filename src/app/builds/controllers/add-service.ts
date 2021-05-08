import { AddServiceController } from '@/presentation/controllers/service/add-service'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { NameValidator } from '@/presentation/validation/name-validator'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { ServiceApiKeyGenerator } from '@/usecases/adapters/api-key-generator'
import { DbAddService } from '@/usecases/implementation/service/add-service'
import { idGenerator, serviceRepository } from '../infra'
import { makeController } from './factory'

const requiredFieldsValidation = new RequiredFieldValidation(['name'])
const nameValidator = new NameValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, nameValidator])

const dbAddService = new DbAddService(idGenerator, new ServiceApiKeyGenerator(), serviceRepository)

export const addServiceController = makeController(
  new AddServiceController(validator, dbAddService)
)
