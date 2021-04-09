import { Service } from '../models/service'

export interface ServiceParams extends Omit<Service, 'id'> {}

export interface CreateService {
  create(data: ServiceParams): Promise<Service>
}
