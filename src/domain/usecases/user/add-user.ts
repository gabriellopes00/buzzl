import { User } from '../../entities/user'
import { ExistingEmailError } from '../errors/user/existing-email'

export interface UserParams extends Omit<User, 'id'> {}

export interface AddUser {
  add(data: UserParams): Promise<User | ExistingEmailError>
}
