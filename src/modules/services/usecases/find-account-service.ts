import { Either, right } from '@/shared/either'
import { Service } from '../domain/entities/service'
import { FindServiceRepository } from '../repositories/find-service-repository'

export class FindAccountService {
  constructor(private readonly repository: FindServiceRepository) {}

  public async execute(accountId: string): Promise<Either<null, Service[]>> {
    const services = await this.repository.findAll({ maintainerAccountId: accountId })
    return right(services)
  }
}
