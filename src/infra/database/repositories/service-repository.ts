import { Service } from '@/domain/service/service'
import { ServiceJoinMaintainer, ServiceRepository } from '@/usecases/ports/service-repository'
import { getRepository } from 'typeorm'
import { ServiceModel } from '../models/service'

export class PgServiceRepository implements ServiceRepository {
  public async add(data: Service): Promise<Service> {
    const repository = getRepository(ServiceModel)
    return await repository.save(repository.create(data))
  }

  public async findOneJoinMaintainer(criteria: {
    id?: string
    apiKey?: string
  }): Promise<ServiceJoinMaintainer> {
    const repository = getRepository(ServiceModel)
    const { id, apiKey } = criteria

    const data = await repository
      .createQueryBuilder('service')
      .innerJoinAndSelect('service.user', 'user')
      .where('service.id = :id', { id })
      .orWhere('service.apiKey = :apiKey', { apiKey })
      .getOne()

    if (!data) return null
    else {
      const user = data.user
      delete data.user
      return { ...data, maintainer: user } // normalized data
    }
  }

  public async delete(criteria: { id?: string; apiKey?: string }): Promise<void> {
    const repository = getRepository(ServiceModel)
    const { id, apiKey } = criteria

    if (id) await repository.delete({ id })
    else if (apiKey) await repository.delete({ apiKey })
  }

  public async update(data: Service): Promise<Service> {
    const repository = getRepository(ServiceModel)
    return await repository.save(data)
  }

  public async findAll(criteria?: { maintainer?: string }): Promise<Service[]> {
    const repository = getRepository(ServiceModel)
    if (criteria && criteria.maintainer) {
      const services = await repository.find({ maintainer: criteria.maintainer })
      if (services.length > 0) return services
      else return null
    } else {
      const services = await repository.find()
      if (services.length > 0) return services
      else return null
    }
  }
}
