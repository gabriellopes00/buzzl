import { UnauthorizedUserDeletionError } from './errors/unauthorized-deletion'
import { UnregisteredEmailError } from './errors/unregistered-email'

export interface DeleteUser {
  delete(
    email: string,
    id: string
  ): Promise<void | UnregisteredEmailError | UnauthorizedUserDeletionError>
}
