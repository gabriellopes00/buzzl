import { Encrypter } from '@/core/infra/encrypter'
import { Hasher } from '@/core/infra/hasher'
import { Either, left, right } from '@/shared/either'
import { SignInError } from './errors/sign-in-error'
import { CreateAccountRepository } from '../repositories/create-account-repository'
import { LoadAccountRepository } from '../repositories/load-account-repository'

export interface SignInParams {
  email: string
  password: string
}

export interface SignInResult {
  accessToken: string
  refreshToken: string
}

export class SignInAccount {
  constructor(
    private readonly repository: CreateAccountRepository & LoadAccountRepository,
    private readonly hasher: Hasher,
    private readonly encrypter: Encrypter
  ) {}

  public async signIn(params: SignInParams): Promise<Either<SignInError, SignInResult>> {
    const { email, password } = params
    const account = await this.repository.findByEmail(email)
    if (!account) return left(new SignInError())

    const authorized = await this.hasher.compare(password, account.password)
    if (!authorized) return left(new SignInError())

    const token = await this.encrypter.encrypt({ id: account.id, name: account.name, email })
    return right({ accessToken: token, refreshToken: token })
  }
}
