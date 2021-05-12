import { Service } from '@/domain/service/service'
import { ServiceRepository } from '@/usecases/ports/service-repository'
import { getRepository } from 'typeorm'
import { ServiceModel } from '../models/service'

export class PgServiceRepository implements ServiceRepository {
  public async add(data: Service): Promise<Service> {
    const repository = getRepository(ServiceModel)
    const service = repository.create(data)
    await repository.save(service)
    return service
  }

  public async exists(criteria: { id?: string; apiKey?: string }): Promise<boolean> {
    const repository = getRepository(ServiceModel)
    const { id, apiKey } = criteria

    if (id) return !!repository.findOne({ where: { id } })
    else if (apiKey) return !!repository.findOne({ where: { apiKey: apiKey } })
  }

  public async delete(criteria: { id?: string; apiKey?: string }): Promise<void> {
    const repository = getRepository(ServiceModel)
    const { id, apiKey } = criteria

    if (id) await repository.delete({ id })
    else if (apiKey) await repository.delete({ apiKey })
  }
}
