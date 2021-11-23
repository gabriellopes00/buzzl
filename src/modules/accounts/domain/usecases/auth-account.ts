import { Either } from '@/shared/either'
import { Account } from '../entities/account'
import { InvalidAccessToken } from './errors/invalid-access-token'

export interface AuthAccountErrors extends InvalidAccessToken {}

export interface AuthAccount {
  auth(accessToken: string): Promise<Either<AuthAccountErrors, Account>>
}
