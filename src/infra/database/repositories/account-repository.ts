import { Account } from '@/modules/accounts/domain/entities/account'
import { CreateAccountRepository } from '@/modules/accounts/repositories/create-account-repository'
import { LoadAccountRepository } from '@/modules/accounts/repositories/load-account-repository'
import { getRepository } from 'typeorm'
import { AccountModel } from '../models/account'

/**
 * PgAccountRepository is the real implementation for the account's repositories interfaces.
 * The [TypeORM]{@link https://typeorm.io/} is being used in the communication with Postgres.
 */
export class PgAccountRepository implements CreateAccountRepository, LoadAccountRepository {
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
   * @returns {PromiseLike<boolean>} Returns either an account was found with give email or not.
   */
  public async existsEmail(email: string): Promise<boolean> {
    const repository = getRepository(AccountModel)
    return !!(await repository.findOne({ where: { email } }))
  }

  // public async exists(criteria: { id?: string; email?: string }): Promise<boolean> {
  //   const repository = getRepository(AccountModel)
  //   const { id, email } = criteria
  //   if (id) return !!(await repository.findOne({ where: { id } }))
  //   else if (email) return !!(await repository.findOne({ where: { email } }))
  // }

  // public async findOne(criteria: { id?: string; email?: string }): Promise<User> {
  //   const repository = getRepository(AccountModel)
  //   const { id, email } = criteria
  //   if (id) return (await repository.findOne({ where: { id } })) || null
  //   else if (email) return (await repository.findOne({ where: { email } })) || null
  // }

  // public async delete(criteria: { id?: string; email?: string }): Promise<void> {
  //   const repository = getRepository(AccountModel)
  //   const { id, email } = criteria
  //   if (id) await repository.delete({ id })
  //   else if (email) await repository.delete({ email })
  // }

  // public async update(data: User): Promise<User> {
  //   const repository = getRepository(AccountModel)
  //   return repository.save(data)
  // }
}
