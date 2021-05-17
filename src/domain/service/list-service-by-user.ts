import { Service } from './service'

export interface ListServiceByUser {
  list(userId: string): Promise<Service[]>
}
