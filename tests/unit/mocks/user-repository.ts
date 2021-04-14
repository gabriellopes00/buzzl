import { User } from '@/domain/entities/user'
import { UserRepository } from '@/usecases/ports/user-repository'
import { fakeUser } from './user'

/*
  Mock methods and classes always return expect value to make test pass.
  If there is a need to change this value, the methods must be mocked with the different wanted value.
*/

export class MockUserRepository implements UserRepository {
  async add(data: User): Promise<User> {
    return fakeUser
  }

  async exists(email: string): Promise<boolean> {
    return false
  }
}
