export const evaluationPath = {
  post: {
    tags: ['Evaluation'],
    summary: 'Evaluation creation route',
    description:
      'In this route, the services will be available to receive evaluation from the customers. The customers must not be registered or authenticated in the api, however, each service has a max of `40` evaluations per day',
    requestBody: {
      required: true,
      description:
        'Add Evaluation route must received the evaluation rating data, and the respective service api-key in the field `service`.',
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/addEvaluationCredentials' } }
      }
    },
    responses: {
      204: {
        description: 'Evaluation successfully registered, does not return any content on success.'
      },
      400: {
        description:
          "Invalid Request will be returned if is missing any param in request body, if receive an unregistered or invalid api-key, or if the respective evaluation's service is currently inactive",
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: [
                    'Missing param in request body',
                    'Invalid api key received: _invalid_key0',
                    'Received api key: _aZVwr6x0HqGdjkX3Vu69G2y3wAfJy is unregistered',
                    'Service for api key: _aZVwr6x0HqGdjkX3Vu69G2y3wAfJy is currently inactive'
                  ]
                }
              },
              required: ['error']
            }
          }
        }
      },
      500: {
        description: 'Internal Server ',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string', example: 'Unexpected internal server error' }
              },
              required: ['error']
            }
          }
        }
      }
    }
  }
}

export const getNPSPath = {
  get: {
    tags: ['Evaluation'],
    summary: 'Get NPS route',
    security: [{ ApiKeyAuth: [] }],
    parameters: [{ $ref: '#/components/parameters/accessToken' }],
    description:
      'In this route, the services will be available to receive evaluation from the customers. The customers must not be registered or authenticated in the api, however, each service has a max of `40` evaluations per day',
    requestBody: {
      required: true,
      description:
        'Get NPS route must receive the api-key of the service from which the nps will be calculated.',
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/listFeedbackCredentials' } }
      }
    },
    responses: {
      204: {
        description: 'Evaluation successfully registered, does not return any content on success.',
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/getNPSResponse' } }
        }
      },
      400: {
        description:
          "Invalid Request will be returned if is missing any param in request body, if receive an unregistered or invalid api-key, or if the respective evaluation's service is currently inactive",
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: [
                    'Missing param in request body',
                    'Invalid api key received: _invalid_key0',
                    'Received api key: _aZVwr6x0HqGdjkX3Vu69G2y3wAfJy is unregistered',
                    'Service for api key: _aZVwr6x0HqGdjkX3Vu69G2y3wAfJy is currently inactive'
                  ]
                }
              },
              required: ['error']
            }
          }
        }
      },
      500: {
        description: 'Internal Server ',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string', example: 'Unexpected internal server error' }
              },
              required: ['error']
            }
          }
        }
      }
    }
  }
}
