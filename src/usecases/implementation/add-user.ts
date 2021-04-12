import { User } from '@/domain/entities/user'
import { AddUser, UserParams } from '@/domain/usecases/add-user'
import { UserRepository } from '../ports/user-repository'
import { UUIDGenerator } from '../ports/uuid-generator'

export class DbAddUser implements AddUser {
  constructor(
    private readonly uuidGenerator: UUIDGenerator,
    private readonly userRepository: UserRepository
  ) {}

  public async add(data: UserParams): Promise<User> {
    const uuid = this.uuidGenerator.generate()
    const user = await this.userRepository.add({ ...data, id: uuid })
    return user
  }
}
