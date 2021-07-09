export const addFeedbackPath = {
  post: {
    tags: ['Feedback'],
    summary: 'Feedback creation route',
    description:
      'In this route, the services will be available to receive feedbacks from the customers. The customers do not be registered or authenticated in the api, however, each service has a max of `40` feedbacks per day',
    requestBody: {
      required: true,
      description:
        "Add Feedback route must received feedback data, and the respective service api-key in the field `service`. Customer's email is optional.",
      content: { 'application/json': { schema: { $ref: '#/schemas/addFeedbackCredentials' } } }
    },
    responses: {
      204: {
        description: 'Feedback successfully registered, no content returned on success.'
      },
      400: {
        description:
          "Invalid Request will be returned if is missing any param in request body, if receive an unregistered or invalid api-key, or if the respective feedback's service is currently inactive",
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
