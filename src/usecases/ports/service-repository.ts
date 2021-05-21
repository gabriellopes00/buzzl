import { Service } from '@/domain/service/service'
import { User } from '@/domain/user/user'

export interface ServiceJoinMaintainer extends Omit<Service, 'maintainer'> {
  maintainer: User
}

export interface ServiceRepository {
  add(data: Service): Promise<Service>
  findOneJoinMaintainer(criteria: { id?: string; apiKey?: string }): Promise<ServiceJoinMaintainer>
  findOne(criteria: { id?: string; apiKey?: string }): Promise<Service>
  findAll(criteria?: { maintainer?: string }): Promise<Service[]>
  delete(criteria: { id?: string; apiKey?: string }): Promise<void>
  update(data: Service): Promise<Service>
}
