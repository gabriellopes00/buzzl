import { Either, left, right } from '@/shared/either'
import { InvalidNameError } from './errors/invalid-name-error'

export class Name {
  private constructor(private readonly name: string) {
    Object.freeze(this)
  }

  get value(): string {
    return this.name
  }

  static create(name: string): Either<InvalidNameError, Name> {
    if (!name || !Name.isValid(name.trim())) {
      return left(new InvalidNameError(name))
    }

    return right(new Name(name))
  }

  static isValid(name: string): boolean {
    const pattern = /^[a-z '-]+$/i
    return name.length < 256 && name.length > 2 && pattern.test(name)
  }
}
