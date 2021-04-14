import { User } from '@/domain/entities/user'

export interface UserRepository {
  add(data: User): Promise<User>
  exists(email: string): Promise<boolean>
}
