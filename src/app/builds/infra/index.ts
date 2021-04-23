import { PsqlUserRepository } from '@/infra/database/repositories/user-repository'
import { getCustomRepository } from 'typeorm'

import { IDGenerator } from '@/infra/utils/uuid-generator'
import { BcryptHasher } from '@/infra/utils/bcrypt-hasher'

export const userRepository = getCustomRepository(PsqlUserRepository)

export const idGenerator = new IDGenerator()

export const hashGenerator = new BcryptHasher()
