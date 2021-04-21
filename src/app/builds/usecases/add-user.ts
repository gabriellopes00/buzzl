import { DbAddUser } from '@/usecases/implementation/add-user'
import { idGenerator, userRepository } from '../infra'

export const dbAddUser = new DbAddUser(idGenerator, userRepository)
