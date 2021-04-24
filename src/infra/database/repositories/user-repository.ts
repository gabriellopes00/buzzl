import { User } from '@/domain/entities/user'
import { UserRepository } from '@/usecases/ports/user-repository'
import { EntityRepository, Repository } from 'typeorm'
import { UserModel } from '../models/user'
/*
 Custom repositories extends default typeorm repository methods such as delete(), findOne(), save()...
 */

@EntityRepository(UserModel)
export class PsqlUserRepository extends Repository<UserModel> implements UserRepository {
  public async add(data: User): Promise<User> {
    const user = this.create(data)
    await this.save(user)
    return user
  }

  public async exists(email: string): Promise<boolean> {
    const user = await this.findOne({ email })
    return !!user
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.findOne({ email })
    return user
  }
}
