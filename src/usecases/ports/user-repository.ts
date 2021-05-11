import { User } from '@/domain/user/user'

export interface UserRepository {
  add(data: User): Promise<User>
  exists(email: string): Promise<boolean>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
}
