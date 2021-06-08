import { PgFeedbackRepository } from '@/infra/database/repositories/feedback-repository'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { ListFeedbackByServiceController } from '@/presentation/controllers/feedback/list-feedback-by-service'
import { ApiKeyValidator } from '@/presentation/validation/api-key-validator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbListFeedbackByService } from '@/usecases/feedback/list-feedback-by-service'
import { makeDecorator } from '../factory'

const requiredFieldsValidation = new RequiredFieldValidation(['service'])
const apiKeyValidator = new ApiKeyValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, apiKeyValidator])

const dbListFeedback = new DbListFeedbackByService(
  new PgServiceRepository(),
  new PgFeedbackRepository()
)

export const listFeedbackController = makeDecorator(
  new ListFeedbackByServiceController(validator, dbListFeedback)
)
