import { Either } from '@/shared/either'
import { Service, ServiceData, ServiceErrors } from '../entities/service'
import { ServiceIdNotFound } from './errors/service-id-not-found'

export interface UpdateServiceParams extends Partial<Omit<ServiceData, 'maintainerAccountId'>> {}
export interface UpdateServiceErrors extends ServiceErrors, ServiceIdNotFound {}

export interface UpdateService {
  update(
    serviceId: string,
    data: UpdateServiceParams
  ): Promise<Either<UpdateServiceErrors, Service>>
}
