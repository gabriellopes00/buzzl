import { InvalidAuthorNameError } from '@/modules/feedbacks/domain/value-objects/errors/invalid-author-name-error'
import { Either, left, right } from '@/shared/either'
import { Entity } from '@/shared/entity'
import { AuthorEmail } from '../value-objects/author-email'
import { AuthorName } from '../value-objects/author-name'
import { InvalidAuthorEmailError } from '../value-objects/errors/invalid-author-email-error'

export interface AuthorErrors extends InvalidAuthorNameError, InvalidAuthorEmailError {}

export interface AuthorData {
  name?: string
  email: string
}

export class Author extends Entity<AuthorData> {
  get name(): string {
    return this.data.name ?? null
  }

  get email(): string {
    return this.data.email
  }

  private constructor(data: AuthorData) {
    super(data, '')
  }

  static create(data: AuthorData): Either<AuthorErrors, Author> {
    if (data.name) {
      const nameResult = AuthorName.create(data.name)
      if (nameResult.isLeft()) return left(nameResult.value)
    }

    const emailResult = AuthorEmail.create(data.email)
    if (emailResult.isLeft()) return left(emailResult.value)

    const service = new Author(data)
    return right(service)
  }
}
