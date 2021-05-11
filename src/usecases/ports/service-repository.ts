import { Service } from '@/domain/service/service'

export interface ServiceRepository {
  add(data: Service): Promise<Service>
}
