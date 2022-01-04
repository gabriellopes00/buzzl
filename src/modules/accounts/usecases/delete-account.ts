import { Either, left, right } from '@/shared/either'
import { IdNotFoundError } from './errors/id-not-found'
import { DeleteAccountRepository } from '../repositories/delete-account-repository'
import { LoadAccountRepository } from '../repositories/load-account-repository'

export interface DeleteAccountErrors extends IdNotFoundError {}

export class DeleteAccount {
  constructor(private readonly repository: DeleteAccountRepository & LoadAccountRepository) {}

  public async delete(accountId: string): Promise<Either<DeleteAccountErrors, void>> {
    const idExists = await this.repository.existsId(accountId)
    if (!idExists) return left(new IdNotFoundError(accountId))
    await this.repository.delete(accountId)
    return right(null)
  }
}
