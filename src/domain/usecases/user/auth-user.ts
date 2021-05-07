import { UnmatchedPasswordError } from './errors/unmatched-password'
import { UnregisteredEmailError } from './errors/unregistered-email'

export interface AuthParams {
  email: string
  password: string
}

export interface AuthUser {
  auth(data: AuthParams): Promise<string | UnregisteredEmailError | UnmatchedPasswordError>
}
