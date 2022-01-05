import { Controller } from '@/core/presentation/controllers'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { JoiValidator } from '@/infra/validation/joi-validator'
import { FindAccountServiceController } from '@/modules/services/controllers/find-account-service-controller'
import { FindAccountService } from '@/modules/services/usecases/find-account-service'
import Joi from 'joi'

export function makeFindAccountServiceController(): Controller {
  const serviceRepository = new PgServiceRepository()
  const findService = new FindAccountService(serviceRepository)

  const validator = new JoiValidator(Joi.object({ id: Joi.string().uuid().required().trim() }))

  const controller = new FindAccountServiceController(validator, findService)
  return controller
}
