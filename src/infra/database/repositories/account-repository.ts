import { Account } from '@/modules/accounts/domain/entities/account'
import { CreateAccountRepository } from '@/modules/accounts/repositories/create-account-repository'
import { DeleteAccountRepository } from '@/modules/accounts/repositories/delete-account-repository'
import { LoadAccountRepository } from '@/modules/accounts/repositories/load-account-repository'
import { getRepository } from 'typeorm'
import { AccountModel } from '../models/account'

/**
 * PgAccountRepository is the real implementation for the account's repositories interfaces.
 * The [TypeORM]{@link https://typeorm.io/} is being used in the communication with Postgres.
 */
/* eslint-disable */
export class PgAccountRepository
  implements CreateAccountRepository, LoadAccountRepository, DeleteAccountRepository
{
  /* eslint-enable */
  /**
   * Create method is implemented from CreateAccountRepository. It adapt Account credentials to
   * the credentials TypeORM model and store it.
   * @param data Account credentials
   */
  public async create(data: Account): Promise<void> {
    const repository = getRepository(AccountModel)
    await repository.save(repository.create(data))
  }

  /**
   * ExistsEmail method is implemented from LoadAccountRepository. It find in the database
   * if exists an account with given email.
   * @param email Search argument
   * @returns {Promise<boolean>} Returns either an account was found with given email or not.
   */
  public async existsEmail(email: string): Promise<boolean> {
    const repository = getRepository(AccountModel)
    return !!(await repository.findOne({ where: { email } }))
  }

  /**
   * ExistsId method is implemented from LoadAccountRepository. It find in the database
   * if exists an account with given id.
   * @param id Search argument
   * @returns {Promise<boolean>} Returns either an account was found with given id or not.
   */
  public async existsId(id: string): Promise<boolean> {
    const repository = getRepository(AccountModel)
    return !!(await repository.findOne({ where: { id } }))
  }

  /**
   * FindById method is implemented from LoadAccountRepository. It find in the database
   * and return an account with given id.
   * @param id Search argument
   * @returns {Promise<Account>} Returns an account with given id.
   */
  public async findById(id: string): Promise<Account> {
    const repository = getRepository(AccountModel)
    const account = await repository.findOne({ where: { id } })
    if (!account) return null
    return Account.create(account, account.id).value as Account
  }

  /**
   * FindByEmail method is implemented from LoadAccountRepository. It find in the database
   * and return an account with given email.
   * @param email Search argument
   * @returns {Promise<Account>} Returns an account with given email.
   */
  public async findByEmail(email: string): Promise<Account> {
    const repository = getRepository(AccountModel)
    const account = await repository.findOne({ where: { email } })
    return !account ? null : Account.adapt(account)
  }

  /**
   * Delete method is implemented from DeleteAccountRepository. It removes from the database
   * account with given id
   * @param id Deletion argument
   * @returns {Promise<void>} Returns void on success
   */
  public async delete(accountId: string): Promise<void> {
    const repository = getRepository(AccountModel)
    await repository.delete(accountId)
  }
}
