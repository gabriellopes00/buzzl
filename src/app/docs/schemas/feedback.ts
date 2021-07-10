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

/**
 * List Feedback response refers to expected response on GET::/feedback route
 */
export const listFeedbackResponse = {
  type: 'object',
  properties: {
    count: {
      type: 'integer',
      example: 250
    },
    categories: {
      type: 'object',
      properties: {
        ISSUE: {
          type: 'object',
          properties: {
            count: { type: 'integer', example: 40 },
            percent: { type: 'float', example: 16 }
          }
        },
        IDEA: {
          type: 'object',
          properties: {
            count: { type: 'integer', example: 67 },
            percent: { type: 'float', example: 26.8 }
          }
        },
        COMMENT: {
          type: 'object',
          properties: {
            count: { type: 'integer', example: 133 },
            percent: { type: 'float', example: 53.2 }
          }
        },
        OTHER: {
          type: 'object',
          properties: {
            count: { type: 'integer', example: 10 },
            percent: { type: 'float', example: 4 }
          }
        }
      }
    },
    feedbacks: { type: 'array', items: { $ref: '#/schemas/feedback' } }
  },
  required: ['count', 'categories', 'feedbacks']
}

/**
 * List Feedback credentials refers to expected data on GET::/feedback route
 */
export const listFeedbackCredentials = {
  type: 'object',
  properties: {
    service: {
      type: 'string',
      example: '_aZVwr6x0HqGdjkX3Vu69G2y3wAfJy',
      maxLength: 30,
      minLength: 30,
      pattern: '/^_[a-z0-9A-Z]{29}$/'
    }
  },
  required: ['service']
}

/**
 * Complete feedback model
 */
export const feedback = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid', example: '7ac87207-4395-4bec-b52c-9e76a8350c14' },
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

/**
 * List Feedback credentials refers to expected data on GET::/feedback route
 */
export const deleteFeedbackCredentials = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid', example: '7ac87207-4395-4bec-b52c-9e76a8350c14' },
    service: {
      type: 'string',
      example: '_aZVwr6x0HqGdjkX3Vu69G2y3wAfJy',
      maxLength: 30,
      minLength: 30,
      pattern: '/^_[a-z0-9A-Z]{29}$/'
    }
  },
  required: ['id', 'service']
}
