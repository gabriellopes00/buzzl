import { Service } from './service'

export interface UpdateService {
  update(serviceId: string, newData: Service | boolean): Promise<Service>
}