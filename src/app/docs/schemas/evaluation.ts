/**
 * Add Evaluation credentials refers to expected data on POST::/evaluation route
 */
export const addEvaluationCredentials = {
  type: 'object',
  properties: {
    rating: {
      type: 'integer',
      example: 9,
      maximum: 10,
      minimum: 0
    },
    service: {
      type: 'string',
      example: '_aZVwr6x0HqGdjkX3Vu69G2y3wAfJy',
      maxLength: 30,
      minLength: 30,
      pattern: '/^_[a-z0-9A-Z]{29}$/'
    }
  },
  required: ['rating', 'service']
}

/**
 * List Feedback response refers to expected response on GET::/feedback route
 */
export const getNPSResponse = {
  type: 'object',
  properties: {
    score: {
      type: 'integer',
      example: 75,
      minimum: -100,
      maximum: 100
    },
    evaluations: {
      type: 'integer',
      example: 340
    },
    level: { type: 'string', enum: ['EXCELLENT', 'GREAT', 'GOOD', 'BAD'], example: 'EXCELLENT' },
    passives: {
      type: 'object',
      properties: {
        quantity: { type: 'integer', example: 100 },
        percent: { type: 'float', example: 35 }
      }
    },
    detractors: {
      type: 'object',
      properties: {
        quantity: { type: 'integer', example: 50 },
        percent: { type: 'float', example: 14.2 }
      }
    },
    promoters: {
      type: 'object',
      properties: {
        quantity: { type: 'integer', example: 150 },
        percent: { type: 'float', example: 42.8 }
      }
    }
  },
  required: ['score', 'level', 'evaluations', 'passives', 'detractors', 'promoters']
}
