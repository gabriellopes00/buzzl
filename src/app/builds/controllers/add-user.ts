import { AddUserController } from '@/presentation/controllers/add-user'
import { dbAddUser } from '../usecases/add-user'
import { validator } from '../usecases/validator'

export const addUserController = new AddUserController(validator, dbAddUser)
