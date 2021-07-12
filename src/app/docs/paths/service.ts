export const servicePath = {
  post: {
    tags: ['Service'],
    summary: 'Service creation route',
    security: [{ ApiKeyAuth: [] }],
    parameters: [{ $ref: '#/components/parameters/accessToken' }],
    description:
      'In this route, the services will be available to receive feedbacks from the customers. The customers do not be registered or authenticated in the api, however, each service has a max of `40` feedbacks per day',
    requestBody: {
      required: true,
      description:
        "Add Feedback route must received feedback data, and the respective service api-key in the field `service`. Customer's email is optional.",
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/addFeedbackCredentials' } }
      }
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
  },

  get: {
    tags: ['Service'],
    summary: 'Feedback list route',
    security: [{ ApiKeyAuth: [] }],
    parameters: [{ $ref: '#/components/parameters/accessToken' }],
    description:
      "In this route, users cal list all received feedbacks by service. The access to the feedbacks is only given to the service's maintainer.",
    requestBody: {
      required: true,
      description:
        'List Feedback route must receive the api-key of the service from which feedbacks will be sought.',
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/listFeedbackCredentials' } }
      }
    },
    responses: {
      200: {
        description:
          'In the response, the feedback data came already formatted. It contains the total amount of the feedbacks; the amount by category, the percentage that the quantity of each category represents of the total and the list with a list of the feedbacks themselves.',
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/listFeedbackResponse' } }
        }
      },
      400: {
        description:
          'Invalid Request will be returned if is missing the service param in request body or if receive an unregistered or invalid api-key',
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
                    'Received api key: _aZVwr6x0HqGdjkX3Vu69G2y3wAfJy is unregistered'
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
  },

  delete: {
    tags: ['Service'],
    summary: 'Feedback deletion route',
    security: [{ ApiKeyAuth: [] }],
    description:
      "In this route, users can delete unwanted feedbacks by their services. The access to feedbacks deletion is given only to the service's maintainer",
    parameters: [{ $ref: '#/components/parameters/accessToken' }],
    requestBody: {
      required: true,
      description:
        'Delete Feedback route must receive the id of the feedback to be deleted, and and the service that this feedback belongs to.',
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/deleteFeedbackCredentials' } }
      }
    },
    responses: {
      204: {
        description: 'No content will be returned on feedback deletion success'
      },
      400: {
        description:
          'Invalid Request will be returned if is missing any param in request body or if receive an unregistered or invalid api-key',
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
                    'Received api key: _aZVwr6x0HqGdjkX3Vu69G2y3wAfJy is unregistered'
                  ]
                }
              },
              required: ['error']
            }
          }
        }
      },
      409: {
        description:
          'Conflict will be returned if the received feedback id to be deleted does not exists',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example:
                    'Received feedback id: 7ac87207-4395-4bec-b52c-9e76a8350c14 is unregistered'
                }
              },
              required: ['error']
            }
          }
        }
      },
      401: {
        description:
          'Unauthorized response will be returned if a user is trying to delete a feedback from a service that does not belong to this user',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example:
                    'Maintainer access denied for key service: _aZVwr6x0HqGdjkX3Vu69G2y3wAfJy'
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
  },
  put: {
    tags: ['Service'],
    summary: 'Feedback deletion route',
    security: [{ ApiKeyAuth: [] }],
    description:
      "In this route, users can delete unwanted feedbacks by their services. The access to feedbacks deletion is given only to the service's maintainer",
    parameters: [{ $ref: '#/components/parameters/accessToken' }],
    requestBody: {
      required: true,
      description:
        'Delete Feedback route must receive the id of the feedback to be deleted, and and the service that this feedback belongs to.',
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/deleteFeedbackCredentials' } }
      }
    },
    responses: {
      204: {
        description: 'No content will be returned on feedback deletion success'
      },
      400: {
        description:
          'Invalid Request will be returned if is missing any param in request body or if receive an unregistered or invalid api-key',
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
                    'Received api key: _aZVwr6x0HqGdjkX3Vu69G2y3wAfJy is unregistered'
                  ]
                }
              },
              required: ['error']
            }
          }
        }
      },
      409: {
        description:
          'Conflict will be returned if the received feedback id to be deleted does not exists',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example:
                    'Received feedback id: 7ac87207-4395-4bec-b52c-9e76a8350c14 is unregistered'
                }
              },
              required: ['error']
            }
          }
        }
      },
      401: {
        description:
          'Unauthorized response will be returned if a user is trying to delete a feedback from a service that does not belong to this user',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example:
                    'Maintainer access denied for key service: _aZVwr6x0HqGdjkX3Vu69G2y3wAfJy'
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

export const newServiceApiKeyPath = {
  post: {
    tags: ['Service'],
    summary: 'Service creation route',
    security: [{ ApiKeyAuth: [] }],
    parameters: [{ $ref: '#/components/parameters/accessToken' }],
    description:
      'In this route, the services will be available to receive feedbacks from the customers. The customers do not be registered or authenticated in the api, however, each service has a max of `40` feedbacks per day',
    requestBody: {
      required: true,
      description:
        "Add Feedback route must received feedback data, and the respective service api-key in the field `service`. Customer's email is optional.",
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/addFeedbackCredentials' } }
      }
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
export const transferServicePath = {
  post: {
    tags: ['Service'],
    summary: 'Service creation route',
    security: [{ ApiKeyAuth: [] }],
    parameters: [{ $ref: '#/components/parameters/accessToken' }],
    description:
      'In this route, the services will be available to receive feedbacks from the customers. The customers do not be registered or authenticated in the api, however, each service has a max of `40` feedbacks per day',
    requestBody: {
      required: true,
      description:
        "Add Feedback route must received feedback data, and the respective service api-key in the field `service`. Customer's email is optional.",
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/addFeedbackCredentials' } }
      }
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
