import { PsqlUserRepository } from '@/infra/database/repositories/user-repository'
import { IDGenerator } from '@/infra/uuid-generator'
import { getCustomRepository } from 'typeorm'

export const idGenerator = new IDGenerator()
export const userRepository = getCustomRepository(PsqlUserRepository)
