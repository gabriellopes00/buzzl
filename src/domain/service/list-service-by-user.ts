import { UnregisteredEmailError } from '../user/errors/unregistered-email'
import { Service } from './service'

export interface ListServiceByUser {
  list(userEmail: string): Promise<Service[] | UnregisteredEmailError>
}
