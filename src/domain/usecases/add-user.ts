import { User } from '../models/user'

export interface AddUser {
  add(data: User): Promise<User>
}
