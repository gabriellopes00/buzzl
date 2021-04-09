import { Service } from '../models/service'
import { ServiceParams } from './create-service'

export interface UpdateService {
  update(serviceId: string, newData: ServiceParams | boolean): Promise<Service>
}
