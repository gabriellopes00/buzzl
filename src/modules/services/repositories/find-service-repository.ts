import { Service } from '../domain/entities/service'

export interface FindServiceRepository {
  findById(id: string): Promise<Service>
  findAll(criteria?: { maintainerAccountId: string }): Promise<Service[]>
}
