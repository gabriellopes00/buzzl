import { Service } from '@/modules/services/domain/entities/service'
import { DeleteServiceRepository } from '@/modules/services/repositories/delete-service-repository'
import { FindServiceRepository } from '@/modules/services/repositories/find-service-repository'
import { SaveServiceRepository } from '@/modules/services/repositories/save-service-repository'
import { getRepository } from 'typeorm'
import { ServiceModel } from '../models/service'

/**
 * PgServiceRepository is the real implementation for the services' repositories interfaces.
 * The [TypeORM]{@link https://typeorm.io/} is being used in the communication with Postgres.
 */
export class PgServiceRepository
implements SaveServiceRepository, FindServiceRepository, DeleteServiceRepository {
  /**
   * Save method is implemented from SaveServiceRepository. It adapt Service credentials to
   * the credentials TypeORM model and store it in the db. If the service is already registered in the db,
   * it's credentials will be updated.
   * @param data Service credentials
   */
  public async save(data: Service): Promise<void> {
    const repository = getRepository(ServiceModel)
    await repository.save(repository.create(data))
  }

  /**
   * Save method is implemented from SaveServiceRepository. It adapt Service credentials to
   * the credentials TypeORM model and store it in the db. If the service is already registered in the db,
   * it's credentials will be updated.
   * @param data Service credentials
   */
  public async findById(id: string): Promise<Service> {
    const repository = getRepository(ServiceModel)
    const data = await repository.findOne(id)
    return Service.adapt(data)
  }

  /**
   * Save method is implemented from SaveServiceRepository. It adapt Service credentials to
   * the credentials TypeORM model and store it in the db. If the service is already registered in the db,
   * it's credentials will be updated.
   * @param data Service credentials
   */
  public async findAll(criteria?: { maintainerAccountId: string }): Promise<Service[]> {
    const repository = getRepository(ServiceModel)
    const { maintainerAccountId } = criteria
    const data = await repository.find(!!criteria && { where: { maintainerAccountId } })
    return data.length === 0 ? null : data.map(s => Service.adapt(s))
  }

  public async delete(serviceId: string): Promise<void> {
    const repository = getRepository(ServiceModel)
    await repository.delete(serviceId)
  }
}
