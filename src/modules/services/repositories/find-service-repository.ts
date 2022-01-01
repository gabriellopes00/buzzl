import { Service } from '../domain/entities/service'

export interface FindServiceRepository {
  findById(id: string): Promise<Service>
  existsId(id: string): Promise<boolean>
  findAll(criteria?: { maintainerAccountId: string }): Promise<Service[]>
}
