import { Service } from '../models/service'

export interface AddService {
  add(data: Service): Promise<Service>
}
