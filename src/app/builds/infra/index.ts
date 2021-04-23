import { PsqlUserRepository } from '@/infra/database/repositories/user-repository'
import { getCustomRepository } from 'typeorm'

import { IDGenerator } from '@/infra/utils/uuid-generator'

export const userRepository = getCustomRepository(PsqlUserRepository)

export const idGenerator = new IDGenerator()
