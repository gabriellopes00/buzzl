import { Either, left } from '@/shared/either'
import { DeleteServiceRepository } from '../repositories/delete-service-repository'
import { FindServiceRepository } from '../repositories/find-service-repository'
import { ServiceIdNotFound } from './errors/service-id-not-found'

export interface DeleteServiceErrors extends ServiceIdNotFound {}

export class DeleteService {
  constructor(private readonly repository: DeleteServiceRepository & FindServiceRepository) {}

  public async execute(
    serviceId: string,
    accountId: string
  ): Promise<Either<DeleteServiceErrors, void>> {
    const service = await this.repository.findById(serviceId)
    if (!service) return left(new ServiceIdNotFound(serviceId))

    if (accountId !== service.maintainerAccountId) throw new Error('unauthorized service deletion')
    await this.repository.delete(serviceId)
  }
}
