import { User } from '@/domain/user/user'
import { UserRepository } from '@/usecases/ports/user-repository'
import { getRepository } from 'typeorm'
import { UserModel } from '../models/user'

export class PgUserRepository implements UserRepository {
  public async add(data: User): Promise<User> {
    const repository = getRepository(UserModel)
    return await repository.save(repository.create(data))
  }

  public async exists(criteria: { id?: string; email?: string }): Promise<boolean> {
    const repository = getRepository(UserModel)
    const { id, email } = criteria
    if (id) return !!(await repository.findOne({ where: { id } }))
    else if (email) return !!(await repository.findOne({ where: { email } }))
  }

  public async findOne(criteria: { id?: string; email?: string }): Promise<User> {
    const repository = getRepository(UserModel)
    const { id, email } = criteria
    if (id) return (await repository.findOne({ where: { id } })) || null
    else if (email) return (await repository.findOne({ where: { email } })) || null
  }

  public async delete(criteria: { id?: string; email?: string }): Promise<void> {
    const repository = getRepository(UserModel)
    const { id, email } = criteria
    if (id) await repository.delete({ id })
    else if (email) await repository.delete({ email })
  }
}
