import { Service } from '../entities/service'

export interface UpdateService {
  update(serviceId: string, newData: Service | boolean): Promise<Service>
}
