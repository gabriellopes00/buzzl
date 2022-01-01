import { Either, left, right } from '@/shared/either'
import { InvalidCategoryError } from './errors/invalid-category'

export class Category {
  private constructor(private readonly category: string) {
    Object.freeze(this)
  }

  get value(): string {
    return this.category
  }

  static create(category: string): Either<InvalidCategoryError, Category> {
    if (!category || !Category.isValid(category.trim())) {
      return left(new InvalidCategoryError(category))
    }

    return right(new Category(category))
  }

  static isValid(category: string): boolean {
    switch (category) {
      case 'ISSUE':
        return true

      case 'OTHER':
        return true

      case 'IDEA':
        return true

      case 'COMMENT':
        return true

      default:
        return false
    }
  }
}
