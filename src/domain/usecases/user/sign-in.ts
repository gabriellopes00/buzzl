import { UnmatchedPasswordError } from './errors/unmatched-password'
import { UnregisteredEmailError } from './errors/unregistered-email'

export interface SignInParams {
  email: string
  password: string
}

export interface SignIn {
  sign(data: SignInParams): Promise<string | UnregisteredEmailError | UnmatchedPasswordError> // signin token signature
}
