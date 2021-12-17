import { Controller } from '@/core/presentation/controllers'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { JoiValidator } from '@/infra/validation/joi-validator'
import { DeleteServiceController } from '@/modules/services/controllers/delete-service-controller'
import { DeleteService } from '@/modules/services/usecases/delete-service'
import Joi from 'joi'

export function makeDeleteServiceController(): Controller {
  const serviceRepository = new PgServiceRepository()
  const deleteService = new DeleteService(serviceRepository)

  const validator = new JoiValidator(
    Joi.object({
      id: Joi.string().uuid().required().trim(),
      accountId: Joi.string().uuid().required().trim()
    })
  )

  const controller = new DeleteServiceController(validator, deleteService)
  return controller
}
