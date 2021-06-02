import { Service } from '../service/service'

export interface CreateServiceNotification {
  send(data: Service, maintainerEmail: string): Promise<void>
}
