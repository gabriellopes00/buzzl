import { User } from '@/domain/user/user'

export interface UserRepository {
  add(data: User): Promise<User>
  exists(criteria: { id?: string; email?: string }): Promise<boolean>
  findOne(criteria: { id?: string; email?: string }): Promise<User>
  delete(criteria: { id?: string; email?: string }): Promise<void>
}
