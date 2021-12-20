import { UUIDGenerator } from '@/core/infra/uuid-generator'
import { Either, left, right } from '@/shared/either'
import { Service } from '../domain/entities/service'
import { SaveServiceRepository } from '../repositories/save-service-repository'
import {
  CreateService,
  CreateServiceErrors,
  CreateServiceParams
} from '../domain/usecases/create-service'

export class DbCreateService implements CreateService {
  constructor(
    private readonly repository: SaveServiceRepository,
    private readonly uuidGenerator: UUIDGenerator
  ) {}

  public async create(
    params: CreateServiceParams,
    maintainerAccountId: string
  ): Promise<Either<CreateServiceErrors, Service>> {
    const uuid = this.uuidGenerator.generate()

    const serviceResult = Service.create({ ...params, maintainerAccountId }, uuid)
    if (serviceResult.isLeft()) return left(serviceResult.value)

    await this.repository.save(serviceResult.value)
    return right(serviceResult.value)
  }
}