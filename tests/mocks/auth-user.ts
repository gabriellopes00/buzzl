import { User } from '@/domain/entities/user'
import { Authentication } from '@/domain/usecases/user/authentication'
import { fakeUser } from './user'

export class MockAuthentication implements Authentication {
  async auth(token: string): Promise<User> {
    return fakeUser
  }
}
