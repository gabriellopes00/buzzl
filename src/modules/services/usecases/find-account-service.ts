import { Either, right } from '@/shared/either'
import { Service } from '../domain/entities/service'
import { FindAccountServices } from '../domain/usecases/find-account-services'
import { FindServiceRepository } from '../repositories/find-service-repository'

export class DbFindAccountService implements FindAccountServices {
  constructor(private readonly repository: FindServiceRepository) {}

  public async find(accountId: string): Promise<Either<null, Service[]>> {
    const services = await this.repository.findAll({ maintainerAccountId: accountId })
    return right(services)
  }
}
