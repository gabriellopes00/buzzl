import { ListServiceByUser } from '@/domain/service/list-service-by-user'
import { Service } from '@/domain/service/service'
import { ServiceRepository } from '../ports/service-repository'

export class DbListServiceByUser implements ListServiceByUser {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  public async list(userId: string): Promise<Service[]> {
    const services = await this.serviceRepository.findAll({ maintainer: userId })
    return services
  }
}
