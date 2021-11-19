import { Either } from '@/shared/either'
import { Account, AccountData } from '../entities/account'
import { ExistingEmailError } from './errors/existing-email'

export interface CreateAccountParams extends AccountData {}

export interface CreateAccount {
  create(data: CreateAccountParams): Promise<Either<ExistingEmailError, Account>>
}
