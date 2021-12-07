import { Service } from '../domain/entities/service'

export interface SaveServiceRepository {
  save(data: Service): Promise<void>
}
