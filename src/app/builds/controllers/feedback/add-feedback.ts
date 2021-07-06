import { PgFeedbackRepository } from '@/infra/database/repositories/feedback-repository'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { IDGenerator } from '@/infra/utils/uuid-generator'
import { AddFeedbackController } from '@/presentation/controllers/feedback/add-feedback'
import { ApiKeyValidator } from '@/presentation/validation/api-key-validator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { FeedbackCategoryValidator } from '@/presentation/validation/feedback-category'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbAddFeedback } from '@/usecases/feedback/add-feedback'

const validator = new ValidatorCompositor([
  new RequiredFieldValidation(['category', 'content', 'service']),
  new ApiKeyValidator(),
  new FeedbackCategoryValidator()
])

const dbAddFeedback = new DbAddFeedback(
  new PgServiceRepository(),
  new IDGenerator(),
  new PgFeedbackRepository()
)

export const addFeedbackController = new AddFeedbackController(validator, dbAddFeedback)
