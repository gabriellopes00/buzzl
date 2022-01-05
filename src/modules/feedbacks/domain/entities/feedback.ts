import { Either, left, right } from '@/shared/either'
import { Entity } from '@/shared/entity'
import { Category } from '../value-objects/category'
import { InvalidCategoryError } from '../value-objects/errors/invalid-category'
import { Author, AuthorData, AuthorErrors } from './author'

export type FeedbackCategory = 'COMMENT' | 'ISSUE' | 'IDEA' | 'OTHER'
export interface FeedbackData {
  title?: string
  content: string
  author?: AuthorData
  isPrivate?: boolean
  category: FeedbackCategory
  serviceId: string
}

export interface FeedbackErrors extends AuthorErrors, InvalidCategoryError {}

export class Feedback extends Entity<FeedbackData> {
  private static _author: Author = null

  get id() {
    return this._id
  }

  get title() {
    return this.data.title || null
  }

  get content() {
    return this.data.content
  }

  get category() {
    return this.data.category
  }

  get serviceId() {
    return this.data.serviceId
  }

  get author() {
    return Feedback._author
  }

  get isPrivate() {
    return this.data.isPrivate
  }

  get createdAt() {
    return this._createdAt
  }

  private constructor(data: FeedbackData, id: string) {
    super(data, id)
  }

  static create(data: FeedbackData, id: string): Either<FeedbackErrors, Feedback> {
    if (data.author) {
      const authorResult = Author.create({ name: data.author.name, email: data.author.email })
      if (authorResult.isLeft()) Feedback._author = null
      else Feedback._author = authorResult.value as Author
    }

    data.isPrivate = data.isPrivate ?? true

    const categoryResult = Category.create(data.category)
    if (categoryResult.isLeft()) return left(categoryResult.value)

    const feedback = new Feedback(data, id)
    return right(feedback)
  }

  static adapt(data: FeedbackData & { id: string }): Feedback {
    return new Feedback(data, data.id)
  }
}
