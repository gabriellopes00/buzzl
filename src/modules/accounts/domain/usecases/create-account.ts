import { Either } from '@/shared/either'
import { Account } from '../entities/account'
import { ExistingEmailError } from './errors/existing-email'

export interface CreateAccountParams extends Omit<Account, 'id'> {}

export interface CreateAccount {
  create(data: CreateAccountParams): Promise<Either<ExistingEmailError, Account>>
}
