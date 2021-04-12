import { User } from '@/domain/entities/user'

export interface UserDataValidation {
  validateName(name: string): boolean
  validateEmail(email: string): boolean
  validatePassword(pass: string): boolean
  validateId(uuid: string): boolean
  validate(data: User): boolean
}

export class UserValidation implements UserDataValidation {
  /**
   * Param must be a string with more than 2 characters, and less than 255 to validate successfully.
   */
  validateName(name: string): boolean {
    if (!name || name.trim().length <= 2 || name.trim().length > 255) return false
    return true
  }

  /**
   * Param must be a string with less than 255, and must have "@" and "." with characters before them to validate successfully.
   */
  validateEmail(email: string): boolean {
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
  validateId(uuid: string): boolean {
    const pattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    return pattern.test(uuid)
  }

  /**
   * Param must be a string with more than 4 characters.
   */
  validatePassword(pass: string): boolean {
    return pass?.length > 4
  }

  /**
   * Param must be a object with all valid User's properties.
   */
  validate(data: User): boolean {
    return !!(
      this.validateName(data.name) &&
      this.validateEmail(data.email) &&
      this.validateId(data.id) &&
      this.validatePassword(data.password)
    )
  }
}
