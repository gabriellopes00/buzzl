import { User } from '@/domain/user/user'
import { ExistingEmailError } from '@/domain/user/errors/existing-email'
import { AddUser, UserParams } from '@/domain/user/add-user'
import { fakeUser } from './user'

export class MockAddUser implements AddUser {
  async add(data: UserParams): Promise<User | ExistingEmailError> {
    return fakeUser
  }
}
