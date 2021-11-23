import { Account } from '../domain/entities/account'

export interface LoadAccountRepository {
  existsEmail(email: string): Promise<boolean>
  existsId(id: string): Promise<boolean>
  findById(id: string): Promise<Account>
}
