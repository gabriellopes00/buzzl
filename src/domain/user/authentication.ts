import { User } from '@/domain/user/user'

export interface Authentication {
  auth(token: string): Promise<User>
}
