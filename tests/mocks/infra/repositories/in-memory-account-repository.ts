import { Account } from '@/modules/accounts/domain/entities/account'
import { CreateAccountRepository } from '@/modules/accounts/repositories/create-account-repository'
import { LoadAccountRepository } from '@/modules/accounts/repositories/load-account-repository'

/**
 * InMemoryAccountsRepository is a fake implementation for the repositories interfaces.
 * All the register are stored in an array in memory.
 */
export class InMemoryAccountsRepository implements CreateAccountRepository, LoadAccountRepository {
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
   * Truncate is a helper method used to clear the register in memory.
   */
  public truncate(): void {
    this.rows = []
  }
}
