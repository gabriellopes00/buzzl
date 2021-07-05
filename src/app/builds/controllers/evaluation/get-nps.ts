import { PgEvaluationRepository } from '@/infra/database/repositories/evaluation-repository'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { GetNPSController } from '@/presentation/controllers/evaluation/get-nps'
import { ApiKeyValidator } from '@/presentation/validation/api-key-validator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { CalculateNPService } from '@/services/nps/calculate-nps'
import { DbListEvaluationByService } from '@/usecases/evaluation/list-evaluation-by-service'

const requiredFieldsValidation = new RequiredFieldValidation(['service'])
const apiKeyValidator = new ApiKeyValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, apiKeyValidator])

const dbListEvaluation = new DbListEvaluationByService(
  new PgServiceRepository(),
  new PgEvaluationRepository()
)

const calculateNPS = new CalculateNPService()

export const getNPSController = new GetNPSController(validator, dbListEvaluation, calculateNPS)
