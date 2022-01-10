import { GoogleAccount } from '@/modules/accounts/domain/entities/google-account'
import { SaveGoogleAccountRepository } from '@/modules/accounts/repositories/create-google-account-repository'
import { LoadGoogleAccountRepository } from '@/modules/accounts/repositories/load-google-account-repository'
import { getRepository } from 'typeorm'
import { GoogleAccountModel } from '../models/GoogleAccount'

/**
 * PgAccountRepository is the real implementation for the account's repositories interfaces.
 * The [TypeORM]{@link https://typeorm.io/} is being used in the communication with Postgres.
 */
/* eslint-disable */
export class PgGoogleAccountRepository
  implements SaveGoogleAccountRepository, LoadGoogleAccountRepository
{
  /* eslint-enable */

  /**
   * Create method is implemented from CreateAccountRepository. It adapt Account credentials to
   * the credentials TypeORM model and store it.
   * @param data Account credentials
   */
  public async save(data: GoogleAccount): Promise<void> {
    const repository = getRepository(GoogleAccountModel)
    await repository.save(repository.create(data))
  }

  public async existsEmail(email: string): Promise<boolean> {
    const repository = getRepository(GoogleAccountModel)
    return !!(await repository.findOne({ where: { email } }))
  }
}
