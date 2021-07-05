import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { UpdateServiceController } from '@/presentation/controllers/service/update-service'
import { ApiKeyValidator } from '@/presentation/validation/api-key-validator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbUpdateService } from '@/usecases/service/update-service'

const requiredFieldsValidation = new RequiredFieldValidation(['apiKey', 'data'])
const apiKeyValidator = new ApiKeyValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, apiKeyValidator])

const dbUpdateService = new DbUpdateService(new PgServiceRepository())

export const updateServiceController = new UpdateServiceController(validator, dbUpdateService)
