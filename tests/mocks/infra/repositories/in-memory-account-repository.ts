import { Account } from '@/modules/accounts/domain/entities/account'
import { CreateAccountRepository } from '@/modules/accounts/repositories/create-account-repository'
import { DeleteAccountRepository } from '@/modules/accounts/repositories/delete-account-repository'
import { LoadAccountRepository } from '@/modules/accounts/repositories/load-account-repository'

/**
 * InMemoryAccountsRepository is a fake implementation for the repositories interfaces.
 * All the register are stored in an array in memory.
 */
/* eslint-disable */
export class InMemoryAccountsRepository
  implements CreateAccountRepository, LoadAccountRepository, DeleteAccountRepository
{
  /* eslint-enable */

  constructor(public rows: Account[] = []) {}

  /**
   * Implemented from CreateAccountRepository.
   * This method register an account in the memory.
   * @param data Account data
   */
  public async create(data: Account): Promise<void> {
    this.rows.push(data)
  }

  /**
   * Implemented from LoadAccountRepository.
   * This method returns either if there is some row registered with given email or not.
   * @param email Search argument
   */
  public async existsEmail(email: string): Promise<boolean> {
    return this.rows.some(row => row.email === email)
  }

  /**
   * Implemented from LoadAccountRepository.
   * This method returns either if there is some row registered with given id or not.
   * @param id Search argument
   */
  public async existsId(accountId: string): Promise<boolean> {
    return this.rows.some(row => row.id === accountId)
  }

  /**
   * Implemented from LoadAccountRepository.
   * This method returns an account data found by a given id.
   * @param id Search argument
   */
  public async findById(accountId: string): Promise<Account> {
    const index = this.rows.findIndex(row => row.id === accountId)
    return this.rows.slice(index, 1)[0]
  }

  /**
   * Implemented from LoadAccountRepository.
   * This method returns an account data found by a given id.
   * @param id Search argument
   */
  public async findByEmail(email: string): Promise<Account> {
    const index = this.rows.findIndex(row => row.email === email)
    return this.rows.slice(index, 1)[0]
  }

  /**
   * Implemented from DeleteAccountRepository.
   * This method delete an account by id from the collection.
   * @param accountId Search argument
   */
  public async delete(accountId: string): Promise<void> {
    const index = this.rows.findIndex(row => row.id === accountId)
    this.rows.splice(index, 1)
  }

  /**
   * Truncate is a helper method used to clear the register in memory.
   */
  public truncate(): void {
    this.rows = []
  }
}
