import { User } from '@/domain/user/user'
import { Authentication } from '@/domain/user/authentication'
import { fakeUser } from './user'

export class MockAuthentication implements Authentication {
  async auth(token: string): Promise<User> {
    return fakeUser
  }
}
