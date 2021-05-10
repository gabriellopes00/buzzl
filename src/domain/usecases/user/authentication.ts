import { User } from '@/domain/entities/user'

export interface Authentication {
  auth(token: string): Promise<User>
}
