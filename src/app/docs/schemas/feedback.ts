/**
 * Add Feedback credentials refers to expected data on POST::/feedback route
 */
export const addFeedbackCredentials = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      example:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae at quod veniam assumenda possimus consequuntur dicta repellat, quia asperiores labore nemo facilis ratione odio accusantium quis similique. Nam, soluta consequatur.'
    },
    customerEmail: {
      type: 'string',
      format: 'email',
      example: 'customer@mail.com',
      maxLength: 256,
      pattern:
        "/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/"
    },
    service: {
      type: 'string',
      example: '_aZVwr6x0HqGdjkX3Vu69G2y3wAfJy',
      maxLength: 30,
      minLength: 30,
      pattern: '/^_[a-z0-9A-Z]{29}$/'
    },
    category: { type: 'string', example: 'ISSUE', enum: ['COMMENT', 'IDEA', 'ISSUE', 'OTHER'] }
  },
  required: ['content', 'service', 'category']
}
