import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { TransferMaintainerController } from '@/presentation/controllers/service/transfer-service-maintainer'
import { ApiKeyValidator } from '@/presentation/validation/api-key-validator'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'
import { DbTransferMaintainer } from '@/usecases/service/transfer-maintainer'
import { makeDecorator } from './factory'

const requiredFieldsValidation = new RequiredFieldValidation(['apiKey', 'newMaintainerEmail'])
const apiKeyValidator = new ApiKeyValidator()
const validator = new ValidatorCompositor([requiredFieldsValidation, apiKeyValidator])

const dbTransferMaintainer = new DbTransferMaintainer(
  new PgUserRepository(),
  new PgServiceRepository()
)
export const transferMaintainerController = makeDecorator(
  new TransferMaintainerController(validator, dbTransferMaintainer)
)
