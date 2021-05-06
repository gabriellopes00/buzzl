import { Service } from '../../entities/service'

export interface ServiceParams extends Omit<Service, 'id' | 'apiKey' | 'isActive'> {}

export interface AddService {
  add(data: Service): Promise<Service>
}
