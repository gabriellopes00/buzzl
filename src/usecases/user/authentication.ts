import { Authentication } from '@/domain/user/authentication'
import { User } from '@/domain/user/user'
import { Encrypter } from '../ports/encrypter'
import { UserRepository } from '../ports/user-repository'

export interface UserTokenPayload {
  id: string
}

export class UserAuthentication implements Authentication {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository
  ) {}

  public async auth(token: string): Promise<User> {
    const payload = (await this.encrypter.decrypt(token)) as UserTokenPayload
    if (payload === null) return null

    const user = await this.userRepository.findById(payload.id)
    return user
  }
}
