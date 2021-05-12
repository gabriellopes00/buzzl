import { User } from '@/domain/user/user'
import { UserRepository } from '@/usecases/ports/user-repository'
import { getRepository } from 'typeorm'
import { UserModel } from '../models/user'

export class PgUserRepository implements UserRepository {
  public async add(data: User): Promise<User> {
    const repository = getRepository(UserModel)
    const user = repository.create(data)
    await repository.save(user)
    return user
  }

  public async exists(email: string): Promise<boolean> {
    const repository = getRepository(UserModel)
    const user = await repository.findOne({ email })
    return !!user
  }

  public async findByEmail(email: string): Promise<User> {
    const repository = getRepository(UserModel)
    const user = await repository.findOne({ email })
    return user || null
  }

  public async findById(id: string): Promise<User> {
    const repository = getRepository(UserModel)
    const user = await repository.findOne({ id })
    return user || null
  }
}
