import { Service } from '@/domain/entities/service'

export interface ServiceRepository {
  add(data: Service): Promise<Service>
}
