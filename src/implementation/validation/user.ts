import { User } from '@/domain/models/user'

export class UserValidation {
  public static validateName(name: string): boolean {
    return !!(!name || name.trim().length < 2 || name.trim().length > 255)
  }

  public static validateEmail(email: string): boolean {
    const pattern = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!email || email.length > 256 || !pattern.test(email)) return false

    const [account, address] = email.split('@')
    if (account.length > 64) return false

    const domain = address.split('.')
    if (domain.some(part => part.length > 63)) return false

    return true
  }

  public static validateId(uuid: string): boolean {
    const pattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    return pattern.test(uuid)
  }

  public static validatePassword(pass: string): boolean {
    return pass.length > 4
  }

  public static validate(data: User): boolean {
    return !!(
      this.validateName(data.name) &&
      this.validateEmail(data.email) &&
      this.validateId(data.id) &&
      this.validatePassword(data.password)
    )
  }
}
