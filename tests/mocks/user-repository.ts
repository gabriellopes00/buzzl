import { User } from '@/domain/user/user'
import { UserRepository } from '@/usecases/ports/user-repository'
import { MockHasher } from './hasher'
import { fakeUser } from './user'

/*
  Mock methods and classes always return expect value to make test pass.
  If there is a need to change this value, the methods must be mocked with the different wanted value.
*/

const mockHasher = new MockHasher()

export class MockUserRepository implements UserRepository {
  async add(data: User): Promise<User> {
    return { ...fakeUser, password: await mockHasher.generate('') }
  }

  async exists(email: string): Promise<boolean> {
    return false
  }

  async findByEmail(email: string): Promise<User> {
    return { ...fakeUser, password: await mockHasher.generate('') }
  }

  async findById(id: string): Promise<User> {
    return { ...fakeUser, password: await mockHasher.generate('') }
  }
}
