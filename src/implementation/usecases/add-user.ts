import { User } from '@/domain/models/user'
import { AddUser } from '@/domain/usecases/add-user'
import { UserRepository } from '../interfaces/user-repository'

export class DbAddUser implements AddUser {
  constructor(private readonly userRepository: UserRepository) {}

  public async add(data: User): Promise<User> {
    await this.userRepository.add(data)
    return null
  }
}
