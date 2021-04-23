import { UnmatchedPasswordError } from '../errors/user/unmatched-password'
import { UnregisteredEmailError } from '../errors/user/unregistered-email'

export interface AuthParams {
  email: string
  password: string
}

export interface AuthUser {
  auth(data: AuthParams): Promise<string | UnregisteredEmailError | UnmatchedPasswordError>
}
