import { AddUser, UserParams } from '@/domain/user/add-user'
import { Authentication } from '@/domain/user/authentication'
import { ChangePassParams, ChangePassword } from '@/domain/user/change-password'
import { DeleteUser } from '@/domain/user/delete-user'
import { EqualPasswordError } from '@/domain/user/errors/equal-passwords'
import { ExistingEmailError } from '@/domain/user/errors/existing-email'
import { UnauthorizedUserDeletionError } from '@/domain/user/errors/unauthorized-deletion'
import { UnmatchedPasswordError } from '@/domain/user/errors/unmatched-password'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { SignIn, SignInParams } from '@/domain/user/sign-in'
import { User } from '@/domain/user/user'
import { MockEncrypter } from '../common/'
import { fakeUser } from './user'

export class MockChangePass implements ChangePassword {
  async change(data: ChangePassParams): Promise<void | ExistingEmailError | EqualPasswordError> {}
}

export class MockDeleteUser implements DeleteUser {
  async delete(
    email: string,
    userId: string
  ): Promise<void | UnregisteredEmailError | UnauthorizedUserDeletionError> {}
}

export class MockSignIn implements SignIn {
  async sign(
    data: SignInParams
  ): Promise<string | UnregisteredEmailError | UnmatchedPasswordError> {
    return new MockEncrypter().encrypt('')
  }
}

export class MockAuthentication implements Authentication {
  async auth(token: string): Promise<User> {
    return fakeUser
  }
}

export class MockAddUser implements AddUser {
  async add(data: UserParams): Promise<User | ExistingEmailError> {
    return fakeUser
  }
}
