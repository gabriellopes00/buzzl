import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { DeleteServiceController } from '@/presentation/controllers/service/delete-service'
import { ApiKeyValidator } from '@/presentation/validation/api-key-validator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbDeleteService } from '@/usecases/service/delete-service'

const requiredFieldsValidation = new RequiredFieldValidation(['apiKey'])
const apiKeyValidator = new ApiKeyValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, apiKeyValidator])

const dbDeleteService = new DbDeleteService(new PgServiceRepository())
export const deleteServiceController = new DeleteServiceController(validator, dbDeleteService)
