import { DeleteUser } from '@/domain/user/delete-user'
import { UnauthorizedUserDeletionError } from '@/domain/user/errors/unauthorized-deletion'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { UserRepository } from '../ports/user-repository'

export class DbDeleteUser implements DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  public async delete(
    email: string,
    id: string
  ): Promise<void | UnregisteredEmailError | UnauthorizedUserDeletionError> {
    const existingUser = await this.userRepository.findOne({ email })
    if (!existingUser) return new UnregisteredEmailError(email)
    else if (existingUser.id !== id) return new UnauthorizedUserDeletionError(email)
    else await this.userRepository.delete({ email })
  }
}
