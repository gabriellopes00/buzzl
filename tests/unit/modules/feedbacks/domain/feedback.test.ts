import {
  Feedback,
  FeedbackCategory,
  FeedbackData
} from '@/modules/feedbacks/domain/entities/feedback'

describe('Feedback Entity', () => {
  const uuid = '8ca55664-b59b-47bc-a402-efbe48b72f1b'
  const feedback: FeedbackData = {
    category: 'COMMENT',
    serviceId: '1e275f7c-f44c-4300-8f48-897520a577f1',
    author: { name: 'John Doe', email: 'johndoe@mail.com' },
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi harum aspernatur, inventore, facilis laudantium enim officia, qui nulla iure unde molestiae. Quia veniam quo odit modi, atque asperiores id ipsum?'
  }

  describe('Author', () => {
    it('Should create a feedback setting null in author credentials if receive invalid ones', () => {
      let result = Feedback.create({ ...feedback, author: { email: 'invalid' } }, uuid)
      expect(result.isRight()).toBeTruthy()
      let f = result.value as Feedback
      expect(f.author).toBeNull()

      result = Feedback.create(
        { ...feedback, author: { name: 'ab', email: 'johndoe@mail.com' } },
        uuid
      )
      expect(result.isRight()).toBeTruthy()
      f = result.value as Feedback
      expect(f.author).toBeNull()
    })

    describe('Category', () => {
      it('Should not create a feedback if category is invalid', () => {
        let result = Feedback.create({ ...feedback, category: 'invalid' as FeedbackCategory }, uuid)
        expect(result.isLeft()).toBeTruthy()
      })
    })

    it('Should create a feedback if receive all valid credentials', () => {
      const result = Feedback.create(feedback, uuid)
      expect(result.isRight()).toBeTruthy()
      expect(result.value).toEqual(expect.objectContaining(feedback))
    })
  })
})
