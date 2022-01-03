import { Controller } from '@/core/presentation/controllers'
import { PgFeedbackRepository } from '@/infra/database/repositories/feedback-repository'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { JoiValidator } from '@/infra/validation/joi-validator'
import { ListFeedbackController } from '@/modules/feedbacks/controllers/list-feedback-controller'
import { ListFeedback } from '@/modules/feedbacks/usecases/list-feedback'
import Joi from 'joi'

export function makeListFeedbackController(): Controller {
  const feedbackRepository = new PgFeedbackRepository()
  const serviceRepository = new PgServiceRepository()
  const listFeedback = new ListFeedback(feedbackRepository, serviceRepository)

  const validator = new JoiValidator(
    Joi.object({
      serviceId: Joi.string().guid({ version: 'uuidv4' })
    })
  )
  return new ListFeedbackController(validator, listFeedback)
}
