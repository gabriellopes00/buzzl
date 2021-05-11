import { User } from '@/domain/user/user'
import { UserParams } from '@/domain/user/add-user'
import { SignInParams } from '@/domain/user/sign-in'
import { MockUUIDGenerator } from './uuid-generator'

const uuidGenerator = new MockUUIDGenerator()

export const fakeUser: User = {
  id: uuidGenerator.generate(),
  name: 'User Name',
  email: 'user@mail.com',
  password: 'userpass_'
}

export const fakeSignInParams: SignInParams = {
  email: 'user@mail.com',
  password: 'userpass_'
}

export const fakeAuthParam = 'auth_token'

export const fakeUserParams: UserParams = {
  name: 'User Name',
  email: 'user@mail.com',
  password: 'userpass_'
}
