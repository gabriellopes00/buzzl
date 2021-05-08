import { PgUserRepository } from '@/infra/database/repositories/user-repository'
import { getCustomRepository } from 'typeorm'

import { IDGenerator } from '@/infra/utils/uuid-generator'
import { Argon2Hasher } from '@/infra/utils/argon2-hasher'
import { PgServiceRepository } from '@/infra/database/repositories/service-repository'

export const userRepository = getCustomRepository(PgUserRepository)

export const serviceRepository = getCustomRepository(PgServiceRepository)

export const idGenerator = new IDGenerator()

export const hashGenerator = new Argon2Hasher()
