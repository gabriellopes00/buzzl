import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { getCustomRepository } from 'typeorm'

import { IDGenerator } from '@/infra/utils/uuid-generator'
import { Argon2Hasher } from '@/infra/utils/argon2-hasher'

export const userRepository = getCustomRepository(PgUserRepository)

export const idGenerator = new IDGenerator()

export const hashGenerator = new Argon2Hasher()
