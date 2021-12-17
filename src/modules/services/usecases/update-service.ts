import { Either, left, right } from '@/shared/either'
import { Service, ServiceData, ServiceErrors } from '../domain/entities/service'
import { ServiceIdNotFound } from '../domain/usecases/errors/service-id-not-found'
import { Name } from '../domain/value-objects/name'
import { FindServiceRepository } from '../repositories/find-service-repository'
import { SaveServiceRepository } from '../repositories/save-service-repository'

export interface UpdateServiceParams extends Partial<Omit<ServiceData, 'maintainerAccountId'>> {}
export interface UpdateServiceErrors extends ServiceErrors, ServiceIdNotFound {}

export class UpdateService {
  constructor(private readonly repository: SaveServiceRepository & FindServiceRepository) {}

  public async update(
    serviceId: string,
    accountId: string,
    data: UpdateServiceParams
  ): Promise<Either<UpdateServiceErrors, Service>> {
    const service = await this.repository.findById(serviceId)
    if (!service) return left(new ServiceIdNotFound(serviceId))

    if (accountId !== service.maintainerAccountId) throw new Error('unauthorized service update')

    if (data.name) {
      const nameResult = Name.create(data.name)
      if (nameResult.isLeft()) return left(nameResult.value)
      service.name = data.name
    }

    if (data.isActive !== undefined) service.isActive = data.isActive
    if (data.description) service.description = data.description

    await this.repository.save(service)
    return right(service)
  }
}
