import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { TransferServiceController } from '@/presentation/controllers/service/transfer-service'
import { ApiKeyValidator } from '@/presentation/validation/api-key-validator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { EmailValidator } from '@/presentation/validation/email-validator'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbTransferService } from '@/usecases/service/transfer-service'
import { makeDecorator } from './factory'

const requiredFieldsValidation = new RequiredFieldValidation(['apiKey', 'newMaintainerEmail'])
const emailValidator = new EmailValidator()
const apiKeyValidator = new ApiKeyValidator()
const validator = new ValidatorCompositor([
  requiredFieldsValidation,
  emailValidator,
  apiKeyValidator
])

const dbTransferService = new DbTransferService(new PgUserRepository(), new PgServiceRepository())
export const transferServiceController = makeDecorator(
  new TransferServiceController(validator, dbTransferService)
)
