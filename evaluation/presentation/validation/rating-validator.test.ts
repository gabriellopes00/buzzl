import { RatingValidator } from '@/presentation/validation/rating-validator'

describe('Rating Validation', () => {
  const sut = new RatingValidator()

  it('Should return an error if raging is not a number', () => {
    const isValid = sut.validate({ rating: '9' })
    expect(isValid).toBeInstanceOf(Error)
  })

  it('Should return an error if raging is less than 0', () => {
    const isValid = sut.validate({ rating: -3 })
    expect(isValid).toBeInstanceOf(Error)
  })

  it('Should return an error if raging is bigger than 10', () => {
    const isValid = sut.validate({ rating: 13 })
    expect(isValid).toBeInstanceOf(Error)
  })

  it('Should return an error if receive a valida rating', () => {
    const isValid = sut.validate({ rating: 7 })
    expect(isValid).toBeNull()
  })
})
