import { UserParams } from '@/domain/usecases/user/add-user'
import { InvalidParamError } from '../errors/invalid-param-error'
import { Validator } from '../ports/validator'

export class UserValidator implements Validator {
  private validateName(name: string): boolean {
    if (!name || name.trim().length <= 2 || name.trim().length > 255) return false
    return true
  }

  private validateEmail(email: string): boolean {
    const pattern = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!email || email.length > 256 || !pattern.test(email)) return false

    const [account, address] = email.split('@')
    if (account.length > 64) return false

    const domain = address.split('.')
    if (domain.some(part => part.length > 63)) return false

    return true
  }

  /**
   * Param must be a valid UUID v4 to validate successfully.
   */
  // validateId(uuid: string): boolean {
  //   const pattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  //   return pattern.test(uuid)
  // }

  /**
   * Param must be a string with more than 4 characters.
   */
  private validatePassword(pass: string): boolean {
    return pass?.length > 4
  }

  validate(data: UserParams): Error {
    if (!this.validateName(data.name)) return new InvalidParamError('name')
    if (!this.validateEmail(data.email)) return new InvalidParamError('email')
    if (!this.validatePassword(data.password)) return new InvalidParamError('password')
    return null
  }
}
