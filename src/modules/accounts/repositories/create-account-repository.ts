import { Account } from '../domain/entities/account'

export interface CreateAccountRepository {
  create(data: Account): Promise<void>
}
