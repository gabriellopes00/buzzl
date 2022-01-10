import { UUIDGenerator } from '@/core/infra/uuid-generator'
import { Either, left, right } from '@/shared/either'
import { GoogleAccount, GoogleAccountData } from '../domain/entities/google-account'
import { SaveGoogleAccountRepository } from '../repositories/create-google-account-repository'
import { LoadAccountRepository } from '../repositories/load-account-repository'
import { LoadGoogleAccountRepository } from '../repositories/load-google-account-repository'
import { ExistingEmailError } from './errors/existing-email'

export interface CreateGoogleAccountParams extends GoogleAccountData {}
export interface CreateGoogleAccountErrors extends ExistingEmailError {}

export class CreateGoogleAccount implements CreateGoogleAccount {
  constructor(
    private readonly googleAccountRepository: SaveGoogleAccountRepository &
      LoadGoogleAccountRepository,
    private readonly accountRepository: LoadAccountRepository,
    private readonly uuidGenerator: UUIDGenerator
  ) {}

  public async create(
    data: CreateGoogleAccountParams
  ): Promise<Either<CreateGoogleAccountErrors, GoogleAccount>> {
    const existingAccount = await this.accountRepository.findByEmail(data.email)
    if (existingAccount) {
      const googleAccount = GoogleAccount.create(
        { ...data, name: existingAccount.name },
        existingAccount.id
      )
      await this.googleAccountRepository.save(googleAccount)
      return right(googleAccount)
    }

    const uuid = this.uuidGenerator.generate()
    const googleAccount = GoogleAccount.create(data, uuid)

    const existingGoogleAccount = await this.googleAccountRepository.existsEmail(data.email)
    if (existingGoogleAccount) return left(new ExistingEmailError(data.email))

    await this.googleAccountRepository.save(googleAccount)
    return right(googleAccount)
  }
}
