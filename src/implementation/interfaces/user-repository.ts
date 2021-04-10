import { User } from '@/domain/models/user'

export interface UserRepository {
  add(data: User): Promise<User>
}
