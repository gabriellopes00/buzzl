import { Service } from '@/domain/service/service'

export interface ServiceRepository {
  add(data: Service): Promise<Service>
  exists(criteria: { id?: string; apiKey?: string }): Promise<boolean>
  delete(criteria: { id?: string; apiKey?: string }): Promise<void>
}
