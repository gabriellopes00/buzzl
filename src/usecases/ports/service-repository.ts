import { Service } from '@/domain/service/service'

export interface ServiceRepository {
  add(data: Service): Promise<Service>
  delete(by: { id?: string; apiKey?: string }): Promise<void>
  exists(by: { id?: string; apiKey?: string }): Promise<boolean>
}
