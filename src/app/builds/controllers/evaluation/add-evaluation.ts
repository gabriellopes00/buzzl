import { PgEvaluationRepository } from '@/infra/database/repositories/evaluation-repository'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { IDGenerator } from '@/infra/utils/uuid-generator'
import { AddEvaluationController } from '@/presentation/controllers/evaluation/add-evaluation'
import { ApiKeyValidator } from '@/presentation/validation/api-key-validator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbAddEvaluation } from '@/usecases/evaluation/add-evaluation'
import { makeDecorator } from '../factory'

const requiredFieldsValidation = new RequiredFieldValidation(['rating', 'service'])
const apiKeyValidator = new ApiKeyValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, apiKeyValidator])

const dbAddEvaluation = new DbAddEvaluation(
  new PgServiceRepository(),
  new IDGenerator(),
  new PgEvaluationRepository()
)

export const addEvaluationController = makeDecorator(
  new AddEvaluationController(validator, dbAddEvaluation)
)
