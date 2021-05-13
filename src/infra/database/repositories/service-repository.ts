import { Service } from '@/domain/service/service'
import { ServiceRepository } from '@/usecases/ports/service-repository'
import { getRepository } from 'typeorm'
import { ServiceModel } from '../models/service'

export class PgServiceRepository implements ServiceRepository {
  public async add(data: Service): Promise<Service> {
    const repository = getRepository(ServiceModel)
    return await repository.save(repository.create(data))
  }

  public async exists(criteria: { id?: string; apiKey?: string }): Promise<boolean> {
    const repository = getRepository(ServiceModel)
    const { id, apiKey } = criteria

    if (id) return !!(await repository.findOne({ where: { id } }))
    else if (apiKey) return !!(await repository.findOne({ where: { apiKey: apiKey } }))
  }

  public async delete(criteria: { id?: string; apiKey?: string }): Promise<void> {
    const repository = getRepository(ServiceModel)
    const { id, apiKey } = criteria

    if (id) await repository.delete({ id })
    else if (apiKey) await repository.delete({ apiKey })
  }
}
