import { EvaluationRatingValidator } from '@/presentation/validation/evaluation-rating-validator'

describe('Evaluation Rating Validation', () => {
  const sut = new EvaluationRatingValidator()

  it('Should return an error if rating less than 0', () => {
    const isValid = sut.validate({ rating: -9 })
    expect(isValid).toBeInstanceOf(Error)
  })

  it('Should return an error if rating bigger than 10', () => {
    const isValid = sut.validate({ rating: 78 })
    expect(isValid).toBeInstanceOf(Error)
  })

  it('Should return an error if receive a null rating', () => {
    const isValid = sut.validate({ rating: null })
    expect(isValid).toBeInstanceOf(Error)
  })

  it('Should return an error if not receive a rating', () => {
    const isValid = sut.validate({})
    expect(isValid).toBeInstanceOf(Error)
  })

  it('Should return null if receive a valid rating', () => {
    const isValid = sut.validate({ rating: 7 })
    expect(isValid).toBeNull()
  })
})
