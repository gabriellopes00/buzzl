import { User } from '@/domain/entities/user'
import { Authentication } from '@/domain/usecases/user/authentication'
import { JsonWebTokenError } from 'jsonwebtoken'
import { Encrypter } from '../../ports/encrypter'
import { UserRepository } from '../../ports/user-repository'

export interface UserTokenPayload {
  id: string
}

export class UserAuthentication implements Authentication {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository
  ) {}

  public async auth(token: string): Promise<User> {
    let payload: UserTokenPayload = null

    try {
      payload = (await this.encrypter.decrypt(token)) as UserTokenPayload
    } catch (error) {
      if (error instanceof JsonWebTokenError) return null
      else throw error
    }

    const user = await this.userRepository.findById(payload.id)
    if (user) return user

    return payload as User
  }
}
