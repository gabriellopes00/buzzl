import { User } from '@/domain/models/user'
import { UserRepository } from '@/implementation/interfaces/user-repository'
import { fakeUser } from './user'

export class MockUserRepository implements UserRepository {
  async add(data: User): Promise<User> {
    return fakeUser
  }
}
