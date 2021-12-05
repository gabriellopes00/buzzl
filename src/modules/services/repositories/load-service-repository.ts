import { Service } from '../domain/entities/service'

export interface LoadServiceRepository {
  findById(id: string): Promise<Service>
}
