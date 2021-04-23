import { PsqlUserRepository } from '@/infra/database/repositories/user-repository'
import { getCustomRepository } from 'typeorm'

import { IDGenerator } from '@/infra/utils/uuid-generator'
import { BcryptHashGenerator } from '@/infra/utils/bcrypt-hash-generator'

export const userRepository = getCustomRepository(PsqlUserRepository)

export const idGenerator = new IDGenerator()

export const hashGenerator = new BcryptHashGenerator()
