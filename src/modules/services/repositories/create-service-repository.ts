import { Service } from '../domain/entities/service'

export interface CreateServiceRepository {
  create(data: Service): Promise<void>
}
