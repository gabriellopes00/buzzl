import { PgAccountRepository } from '@/infra/database/repositories/account-repository'
import { PgGoogleAccountRepository } from '@/infra/database/repositories/google-account-repository'
import { GoogleStrategyHandler } from '@/infra/oauth/passport-google'
import { UUIDV4Generator } from '@/infra/utils/uuid-generator'
import { CreateGoogleAccount } from '@/modules/accounts/usecases/create-google-account'

export function makeGoogleStrategyHandler(): GoogleStrategyHandler {
  const accountRepository = new PgAccountRepository()
  const googleAccountRepository = new PgGoogleAccountRepository()
  const uuidGenerator = new UUIDV4Generator()
  const createAccount = new CreateGoogleAccount(
    googleAccountRepository,
    accountRepository,
    uuidGenerator
  )
  return new GoogleStrategyHandler(createAccount)
}
