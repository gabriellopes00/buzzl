import { Service } from '../entities/service'

export interface AddService {
  add(data: Service): Promise<Service>
}
