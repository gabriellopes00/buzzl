import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { ServiceAPIKeyGenerator } from '@/infra/utils/api-key-generator'
import { RegenerateApiKeyController } from '@/presentation/controllers/service/regenerate-service-api-key'
import { ApiKeyValidator } from '@/presentation/validation/api-key-validator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbRegenerateServiceApiKey } from '@/usecases/service/regenerate-service-api-key'

const validator = new ValidatorCompositor([
  new RequiredFieldValidation(['apiKey']),
  new ApiKeyValidator()
])

const dbRegenerateKey = new DbRegenerateServiceApiKey(
  new PgServiceRepository(),
  new ServiceAPIKeyGenerator()
)

export const regenerateKeyController = new RegenerateApiKeyController(validator, dbRegenerateKey)
