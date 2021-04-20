import { User } from '@/domain/entities/user'
import { ExistingEmailError } from '@/domain/usecases/errors/user/existing-email'
import { AddUser, UserParams } from '@/domain/usecases/user/add-user'
import { fakeUser } from './user'

export class MockAddUser implements AddUser {
  async add(data: UserParams): Promise<User | ExistingEmailError> {
    return fakeUser
  }
}
