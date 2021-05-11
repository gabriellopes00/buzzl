import { Service } from './service'

export interface ServiceParams extends Pick<Service, 'name' | 'description' | 'maintainer'> {}

export interface AddService {
  add(data: ServiceParams): Promise<Service>
}
