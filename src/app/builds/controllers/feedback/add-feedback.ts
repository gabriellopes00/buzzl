import { PgFeedbackRepository } from '@/infra/database/repositories/feedback-repository'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { IDGenerator } from '@/infra/utils/uuid-generator'
import { AddFeedbackController } from '@/presentation/controllers/feedback/add-feedback'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbAddFeedback } from '@/usecases/feedback/add-feedback'
import { makeDecorator } from '../factory'

const requiredFieldsValidation = new RequiredFieldValidation(['category', 'content', 'service'])
// const apiKeyValidator = new ApiKeyValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation])

const dbAddFeedback = new DbAddFeedback(
  new PgServiceRepository(),
  new IDGenerator(),
  new PgFeedbackRepository()
)

export const addFeedbackController = makeDecorator(
  new AddFeedbackController(validator, dbAddFeedback)
)
