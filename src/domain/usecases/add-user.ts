import { User } from '../models/user'

export interface UserParams extends Omit<User, 'id'> {}

export interface AddUser {
  add(data: UserParams): Promise<User>
}
