import { Controller } from '@/core/presentation/controllers'
import { PgFeedbackRepository } from '@/infra/database/repositories/feedback-repository'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { UUIDV4Generator } from '@/infra/utils/uuid-generator'
import { JoiValidator } from '@/infra/validation/joi-validator'
import {
  CreateFeedbackController,
  CreateFeedbackControllerParams
} from '@/modules/feedbacks/controllers/create-feedback-controller'
import { CreateFeedback } from '@/modules/feedbacks/usecases/create-feedback'
import Joi from 'joi'

export function makeCreateFeedbackController(): Controller {
  const feedbackRepository = new PgFeedbackRepository()
  const serviceRepository = new PgServiceRepository()
  const uuidGenerator = new UUIDV4Generator()
  const createFeedback = new CreateFeedback(feedbackRepository, serviceRepository, uuidGenerator)

  const validator = new JoiValidator(
    Joi.object<CreateFeedbackControllerParams>({
      title: Joi.string().min(4).max(400).optional().trim(),
      content: Joi.string().required().trim(),
      is_private: Joi.bool().required(),
      category: Joi.string().valid('COMMENT', 'ISSUE', 'IDEA', 'OTHER').required().trim(),
      service_id: Joi.string().guid({ version: 'uuidv4' }),
      author: Joi.object<CreateFeedbackControllerParams['author']>({
        name: Joi.string().min(4).max(255).required().trim(),
        email: Joi.string().email().required().trim()
      }).optional()
    })
  )
  return new CreateFeedbackController(validator, createFeedback)
}
