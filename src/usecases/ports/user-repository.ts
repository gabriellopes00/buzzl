import { User } from '@/domain/user/user'

export interface UserRepository {
  add(data: User): Promise<User>
  exists(criteria: { id?: string; email?: string }): Promise<boolean>
  findOne(criteria: { id?: string; email?: string }): Promise<User>
  update(criteria: { id?: string; email?: string }, data: User): Promise<User>
  delete(criteria: { id?: string; email?: string }): Promise<void>
}
