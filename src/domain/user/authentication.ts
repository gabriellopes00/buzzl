import { User } from '@/domain/user/user'

export interface UserTokenPayload {
  id: string
}

export interface Authentication {
  auth(token: string): Promise<User>
}
