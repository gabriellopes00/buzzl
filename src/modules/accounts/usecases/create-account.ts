import { Hasher } from '@/core/infra/hasher'
import { UUIDGenerator } from '@/core/infra/uuid-generator'
import { Either, left, right } from '@/shared/either'
import { Account, AccountData, AccountErrors } from '../domain/entities/account'
import { ExistingEmailError } from './errors/existing-email'
import { CreateAccountRepository } from '../repositories/create-account-repository'
import { LoadAccountRepository } from '../repositories/load-account-repository'

export interface CreateAccountParams extends AccountData {}
export interface CreateAccountErrors extends AccountErrors, ExistingEmailError {}

export class CreateAccount implements CreateAccount {
  constructor(
    private readonly repository: CreateAccountRepository & LoadAccountRepository,
    private readonly uuidGenerator: UUIDGenerator,
    private readonly hasher: Hasher
  ) {}

  public async create(data: CreateAccountParams): Promise<Either<CreateAccountErrors, Account>> {
    const { email, password } = data

    const uuid = this.uuidGenerator.generate()
    const accountResult = Account.create(data, uuid)
    if (accountResult.isLeft()) return left(accountResult.value)

    const emailExists = await this.repository.existsEmail(email)
    if (emailExists) return left(new ExistingEmailError(email))

    const hashPassword = await this.hasher.generate(password)
    accountResult.value.password = hashPassword

    await this.repository.create(accountResult.value)
    return right(accountResult.value)
  }
}
