import { Either, left, right } from '@/shared/either'
import { Service } from '../domain/entities/service'
import { ServiceIdNotFound } from '../domain/usecases/errors/service-id-not-found'
import {
  UpdateService,
  UpdateServiceErrors,
  UpdateServiceParams
} from '../domain/usecases/update-service'
import { Name } from '../domain/value-objects/name'
import { CreateServiceRepository } from '../repositories/create-service-repository'
import { LoadServiceRepository } from '../repositories/load-service-repository'

export class DbUpdateService implements UpdateService {
  constructor(private readonly repository: CreateServiceRepository & LoadServiceRepository) {}

  public async update(
    serviceId: string,
    data: UpdateServiceParams
  ): Promise<Either<UpdateServiceErrors, Service>> {
    const service = await this.repository.findById(serviceId)
    if (!service) return left(new ServiceIdNotFound(serviceId))

    if (data.name) {
      const nameResult = Name.create(data.name)
      if (nameResult.isLeft()) return left(nameResult.value)
    }

    service.name = data.name || service.name
    service.isActive = data.isActive === undefined ? service.isActive : data.isActive
    service.description = data.description || service.description

    await this.repository.create(service)
    return right(service)
  }
}
