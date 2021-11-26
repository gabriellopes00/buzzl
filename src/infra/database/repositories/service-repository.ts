import { Service } from '@/modules/services/domain/entities/service'
import { CreateServiceRepository } from '@/modules/services/repositories/create-service-repository'
import { getRepository } from 'typeorm'
import { ServiceModel } from '../models/service'

/**
 * PgServiceRepository is the real implementation for the services' repositories interfaces.
 * The [TypeORM]{@link https://typeorm.io/} is being used in the communication with Postgres.
 */
export class PgServiceRepository implements CreateServiceRepository {
  /**
   * Create method is implemented from CreateServiceRepository. It adapt Service credentials to
   * the credentials TypeORM model and store it.
   * @param data Service credentials
   */
  public async create(data: Service): Promise<void> {
    const repository = getRepository(ServiceModel)
    await repository.save(repository.create(data))
  }
}
