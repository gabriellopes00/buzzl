import { Controller } from '@/core/presentation/controllers'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { UUIDV4Generator } from '@/infra/utils/uuid-generator'
import { CreateServiceController } from '@/modules/services/controllers/create-service-controller'
import { DbCreateService } from '@/modules/services/usecases/create-service'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'

export function makeCreateServiceController(): Controller {
  const repository = new PgServiceRepository()
  const createService = new DbCreateService(repository, new UUIDV4Generator())
  const validator = new ValidatorCompositor([
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('is_active')
  ])
  return new CreateServiceController(validator, createService)
}
