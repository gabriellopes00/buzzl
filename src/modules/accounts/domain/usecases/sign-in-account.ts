import { Either } from '@/shared/either'
import { SignInError } from './errors/sign-in-error'

export interface SignInParams {
  email: string
  password: string
}
export interface SignInResult {
  accessToken: string
  refreshToken: string
}

export interface SignInAccount {
  signIn(params: SignInParams): Promise<Either<SignInError, SignInResult>>
}
