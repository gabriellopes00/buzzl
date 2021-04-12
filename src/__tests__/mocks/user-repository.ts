import { User } from '@/domain/entities/user'
import { UserRepository } from '@/usecases/ports/user-repository'
import { fakeUser } from './user'

export class MockUserRepository implements UserRepository {
  async add(data: User): Promise<User> {
    return fakeUser
  }
}
