import { Controller } from '@/core/presentation/controllers'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { JoiValidator } from '@/infra/validation/joi-validator'
import { UpdateServiceController } from '@/modules/services/controllers/update-service-controller'
import { UpdateService } from '@/modules/services/usecases/update-service'
import Joi from 'joi'

export function makeUpdateServiceController(): Controller {
  const serviceRepository = new PgServiceRepository()
  const updateService = new UpdateService(serviceRepository)

  const validator = new JoiValidator(
    Joi.object({
      id: Joi.string().uuid().required().trim(),
      name: Joi.string().min(3).max(255).optional().trim(),
      description: Joi.string().optional().trim(),
      isValid: Joi.bool().optional()
    })
  )

  const controller = new UpdateServiceController(validator, updateService)
  return controller
}
