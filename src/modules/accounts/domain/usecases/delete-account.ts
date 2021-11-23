import { Either } from '@/shared/either'
import { IdNotFoundError } from './errors/id-not-found'

export interface DeleteAccountErrors extends IdNotFoundError {}

export interface DeleteAccount {
  delete(accountId: string): Promise<Either<DeleteAccountErrors, void>>
}
