import { User } from '@/domain/entities/user'
import { UserParams } from '@/domain/usecases/user/add-user'
import { MockUUIDGenerator } from './uuid-generator'

const uuidGenerator = new MockUUIDGenerator()

export const fakeUser: User = {
  id: uuidGenerator.generate(),
  name: 'User Name',
  email: 'user@mail.com',
  password: 'userpass_'
}

export const fakeUserParams: UserParams = {
  name: 'User Name',
  email: 'user@mail.com',
  password: 'userpass_'
}
