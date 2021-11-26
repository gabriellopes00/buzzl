import { Either } from '@/shared/either'
import { Service, ServiceData, ServiceErrors } from '../entities/service'

export interface CreateServiceParams extends Omit<ServiceData, 'maintainerAccountId'> {}
export interface CreateServiceErrors extends ServiceErrors {}

export interface CreateService {
  create(
    data: CreateServiceParams,
    maintainerAccountId: string
  ): Promise<Either<CreateServiceErrors, Service>>
}
