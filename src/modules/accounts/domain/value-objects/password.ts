import { Either, left, right } from '@/shared/either'
import { InvalidPasswordError } from './errors/invalid-password-error'

export class Password {
  private constructor(private readonly password: string) {
    Object.freeze(this)
  }

  get value(): string {
    return this.password
  }

  static create(password: string): Either<InvalidPasswordError, Password> {
    if (!password || !Password.isValid(password.trim())) {
      return left(new InvalidPasswordError(password))
    }

    return right(new Password(password))
  }

  static isValid(password: string): boolean {
    return password.length < 256 && password.length >= 4
  }
}
