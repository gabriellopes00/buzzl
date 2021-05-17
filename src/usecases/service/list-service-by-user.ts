import { ListServiceByUser } from '@/domain/service/list-service-by-user'
import { Service } from '@/domain/service/service'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { ServiceRepository } from '../ports/service-repository'
import { UserRepository } from '../ports/user-repository'

export class DbListServiceByUser implements ListServiceByUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly serviceRepository: ServiceRepository
  ) {}

  public async list(userEmail: string): Promise<Service[] | UnregisteredEmailError> {
    const user = await this.userRepository.findOne({ email: userEmail })
    if (!user) return new UnregisteredEmailError(userEmail)

    const services = await this.serviceRepository.findAll({ maintainer: user.id })
    if (!services) return null
    else return services
  }
}
