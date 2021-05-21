import { EqualPasswordError } from './errors/equal-passwords'
import { UnmatchedPasswordError } from './errors/unmatched-password'
import { User } from './user'

export interface ChangePassParams {
  userId: string
  currentPass: string
  newPass: string
}

export interface ChangePassword {
  change(data: ChangePassParams): Promise<User | UnmatchedPasswordError | EqualPasswordError>
}
