import { Controller } from '@/core/presentation/controllers'
import { PgAccountRepository } from '@/infra/database/repositories/account-repository'
import { JoiValidator } from '@/infra/validation/joi-validator'
import {
  DeleteAccountController,
  DeleteAccountControllerParams
} from '@/modules/accounts/controllers/delete-account-controller'
import { DeleteAccount } from '@/modules/accounts/usecases/delete-account'
import Joi from 'joi'

export function makeDeleteAccountController(): Controller {
  const accountRepository = new PgAccountRepository()
  const deleteAccount = new DeleteAccount(accountRepository)

  const validator = new JoiValidator(
    Joi.object<DeleteAccountControllerParams>({
      id: Joi.string().uuid().trim().required(),
      accountId: Joi.string().uuid().trim().required()
    })
  )
  const controller = new DeleteAccountController(validator, deleteAccount)
  return controller
}
