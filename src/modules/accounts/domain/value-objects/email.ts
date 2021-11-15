import { Either, left, right } from '@/shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'

export class Email {
  private constructor(private readonly email: string) {
    Object.freeze(this)
  }

  get value(): string {
    return this.email
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    if (!email || !Email.isValid(email)) {
      return left(new InvalidEmailError(email))
    }

    return right(new Email(email))
  }

  static isValid(email: string): boolean {
    const pattern =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (email.length > 256 || !pattern.test(email)) {
      return false
    }

    const [account, address] = email.split('@')
    if (account.length > 64) {
      return false
    }

    const domain = address.split('.')
    if (domain.some(part => part.length > 63)) {
      return false
    }

    return true
  }
}
