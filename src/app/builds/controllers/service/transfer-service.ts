import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { TransferServiceController } from '@/presentation/controllers/service/transfer-service'
import { ApiKeyValidator } from '@/presentation/validation/api-key-validator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { EmailValidator } from '@/presentation/validation/email-validator'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbTransferService } from '@/usecases/service/transfer-service'

const validator = new ValidatorCompositor([
  new RequiredFieldValidation(['apiKey', 'newMaintainerEmail']),
  new EmailValidator(),
  new ApiKeyValidator()
])

const dbTransferService = new DbTransferService(new PgUserRepository(), new PgServiceRepository())
export const transferServiceController = new TransferServiceController(validator, dbTransferService)
