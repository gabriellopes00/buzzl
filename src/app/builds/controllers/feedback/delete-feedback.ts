import { PgFeedbackRepository } from '@/infra/database/repositories/feedback-repository'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { DeleteFeedbackController } from '@/presentation/controllers/feedback/delete-feeedback'
import { ApiKeyValidator } from '@/presentation/validation/api-key-validator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbDeleteFeedback } from '@/usecases/feedback/delete-feedback'

const requiredFieldsValidation = new RequiredFieldValidation(['service', 'id'])
const apiKeyValidator = new ApiKeyValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, apiKeyValidator])

const dbDeleteFeedback = new DbDeleteFeedback(new PgServiceRepository(), new PgFeedbackRepository())
export const deleteFeedbackController = new DeleteFeedbackController(validator, dbDeleteFeedback)
