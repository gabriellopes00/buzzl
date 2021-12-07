import { Either } from '@/shared/either'
import { Service } from '../entities/service'

export interface FindAccountServices {
  find(accountId: string): Promise<Either<null, Service[]>>
}
