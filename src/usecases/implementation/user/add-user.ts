import { User } from '@/domain/entities/user'
import { AddUser, UserParams } from '@/domain/usecases/user/add-user'
import { ExistingEmailError } from '@/domain/usecases/user/errors/existing-email'
import { UserRepository } from '../../ports/user-repository'
import { UUIDGenerator } from '../../ports/uuid-generator'
import { Hasher } from '../../ports/hasher'

export class DbAddUser implements AddUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uuidGenerator: UUIDGenerator,
    private readonly hasher: Hasher
  ) {}

  public async add(data: UserParams): Promise<User | ExistingEmailError> {
    const existingEmail = await this.userRepository.exists(data.email)
    if (existingEmail) return new ExistingEmailError(data.email)

    const uuid = this.uuidGenerator.generate()
    const hashPassword = await this.hasher.generate(data.password)

    const user = await this.userRepository.add({ ...data, id: uuid, password: hashPassword })
    return user
  }
}
