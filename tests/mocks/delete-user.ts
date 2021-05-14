import { DeleteUser } from '@/domain/user/delete-user'
import { UnauthorizedUserDeletionError } from '@/domain/user/errors/unauthorized-deletion'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'

export class MockDeleteUser implements DeleteUser {
  async delete(
    email: string,
    userId: string
  ): Promise<void | UnregisteredEmailError | UnauthorizedUserDeletionError> {}
}
