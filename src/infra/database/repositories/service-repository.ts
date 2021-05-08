import { Service } from '@/domain/entities/service'
import { ServiceRepository } from '@/usecases/ports/service-repository'
import { EntityRepository, Repository } from 'typeorm'
import { ServiceModel } from '../models/service'

@EntityRepository(ServiceModel)
export class PgServiceRepository extends Repository<Service> implements ServiceRepository {
  public async add(data: Service): Promise<Service> {
    const service = this.create(data)
    await this.save(service)
    return service
  }
}
