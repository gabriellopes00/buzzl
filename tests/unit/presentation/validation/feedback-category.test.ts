import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { FeedbackCategoryValidator } from '@/presentation/validation/feedback-category'

describe('Feedback Category Validation', () => {
  const sut = new FeedbackCategoryValidator()
  const error = new InvalidParamError('category', 'Invalid feedback category')

  it('Should not return an error if receive a valid feedback category', () => {
    let err = sut.validate({ category: 'ISSUE' })
    expect(err).toBeNull()

    err = sut.validate({ category: 'OTHER' })
    expect(err).toBeNull()

    err = sut.validate({ category: 'COMMENT' })
    expect(err).toBeNull()

    err = sut.validate({ category: 'IDEA' })
    expect(err).toBeNull()
  })

  it('Should return an error if receive an invalid feedback category', () => {
    const err = sut.validate({ category: 'invalid' })
    expect(err).toEqual(error)
  })
})
