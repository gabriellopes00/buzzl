import { Controller } from '@/core/presentation/controllers'
import { PgAccountRepository } from '@/infra/database/repositories/account-repository'
import { DeleteAccountController } from '@/modules/accounts/controllers/delete-account-controller'
import { DbDeleteAccount } from '@/modules/accounts/usecases/delete-account'
import { ValidatorCompositor } from '@/presentation/validation/compositor'
import { RequiredFieldValidation } from '@/presentation/validation/required-fields'

export function makeDeleteAccountController(): Controller {
  const accountRepository = new PgAccountRepository()
  const deleteAccount = new DbDeleteAccount(accountRepository)

  const validator = new ValidatorCompositor([
    new RequiredFieldValidation('id'),
    new RequiredFieldValidation('accountId')
  ])
  const controller = new DeleteAccountController(validator, deleteAccount)
  return controller
}
