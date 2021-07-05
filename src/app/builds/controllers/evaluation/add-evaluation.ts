import { PgEvaluationRepository } from '@/infra/database/repositories/evaluation-repository'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { IDGenerator } from '@/infra/utils/uuid-generator'
import { AddEvaluationController } from '@/presentation/controllers/evaluation/add-evaluation'
import { ApiKeyValidator } from '@/presentation/validation/api-key-validator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RatingValidator } from '@/presentation/validation/rating-validator'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbAddEvaluation } from '@/usecases/evaluation/add-evaluation'

const requiredFieldsValidation = new RequiredFieldValidation(['rating', 'service'])
const apiKeyValidator = new ApiKeyValidator()
const ratingValidator = new RatingValidator()
const validator = new ValidatorCompositor([
  requiredFieldsValidation,
  ratingValidator,
  apiKeyValidator
])

const dbAddEvaluation = new DbAddEvaluation(
  new PgServiceRepository(),
  new IDGenerator(),
  new PgEvaluationRepository()
)

export const addEvaluationController = new AddEvaluationController(validator, dbAddEvaluation)
