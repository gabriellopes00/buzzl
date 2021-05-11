import { User } from './user'
import { ExistingEmailError } from './errors/existing-email'

export interface UserParams extends Omit<User, 'id'> {}

export interface AddUser {
  add(data: UserParams): Promise<User | ExistingEmailError>
}
