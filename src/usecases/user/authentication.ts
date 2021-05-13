import { Authentication, UserTokenPayload } from '@/domain/user/authentication'
import { User } from '@/domain/user/user'
import { Encrypter } from '../ports/encrypter'
import { UserRepository } from '../ports/user-repository'

export class UserAuthentication implements Authentication {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository
  ) {}

  public async auth(token: string): Promise<User> {
    const payload = (await this.encrypter.decrypt(token)) as UserTokenPayload
    if (!payload) return null

    const user = await this.userRepository.findBy({ id: payload.id })
    return user
  }
}
