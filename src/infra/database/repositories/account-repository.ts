import { Account } from '@/modules/accounts/domain/entities/account'
import { CreateAccountRepository } from '@/modules/accounts/repositories/create-account-repository'
import { LoadAccountRepository } from '@/modules/accounts/repositories/load-account-repository'
import { getRepository } from 'typeorm'
import { AccountModel } from '../models/account'

export class PgAccountRepository implements CreateAccountRepository, LoadAccountRepository {
  public async create(data: Account): Promise<void> {
    const repository = getRepository(AccountModel)
    await repository.save(repository.create(data))
  }

  public async existsEmail(email: string): Promise<boolean> {
    const repository = getRepository(AccountModel)
    const account = await repository.findOne({ where: { email } })
    return !!account
  }

  // public async exists(criteria: { id?: string; email?: string }): Promise<boolean> {
  //   const repository = getRepository(AccountModel)
  //   const { id, email } = criteria
  //   if (id) return !!(await repository.findOne({ where: { id } }))
  //   else if (email) return !!(await repository.findOne({ where: { email } }))
  // }

  // public async findOne(criteria: { id?: string; email?: string }): Promise<User> {
  //   const repository = getRepository(AccountModel)
  //   const { id, email } = criteria
  //   if (id) return (await repository.findOne({ where: { id } })) || null
  //   else if (email) return (await repository.findOne({ where: { email } })) || null
  // }

  // public async delete(criteria: { id?: string; email?: string }): Promise<void> {
  //   const repository = getRepository(AccountModel)
  //   const { id, email } = criteria
  //   if (id) await repository.delete({ id })
  //   else if (email) await repository.delete({ email })
  // }

  // public async update(data: User): Promise<User> {
  //   const repository = getRepository(AccountModel)
  //   return repository.save(data)
  // }
}
