import { Either, left, right } from '@/shared/either'
import { InvalidAuthorNameError } from './errors/invalid-author-name-error'

export class AuthorName {
  private constructor(private readonly name: string) {
    Object.freeze(this)
  }

  get value(): string {
    return this.name
  }

  static create(name: string): Either<InvalidAuthorNameError, AuthorName> {
    if (!name || !AuthorName.isValid(name.trim())) {
      return left(new InvalidAuthorNameError(name))
    }

    return right(new AuthorName(name))
  }

  static isValid(name: string): boolean {
    const pattern = /^[a-z '-]+$/i
    return name.length < 256 && name.length > 2 && pattern.test(name)
  }
}
