import { Either } from '@/shared/either'
import { Account, AccountData, AccountErrors } from '../entities/account'
import { ExistingEmailError } from './errors/existing-email'

export interface CreateAccountParams extends AccountData {}
export interface CreateAccountErrors extends AccountErrors, ExistingEmailError {}

export interface CreateAccount {
  create(data: CreateAccountParams): Promise<Either<CreateAccountErrors, Account>>
}
