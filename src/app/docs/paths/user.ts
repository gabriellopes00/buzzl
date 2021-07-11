/**
 * POST::/signup route specification
 */
export const signupPath = {
  post: {
    tags: ['User'],
    summary: 'User registration route',
    requestBody: {
      required: true,
      description: "Sign Up path must receive the user's data to register them in the API",
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/signupCredentials' } }
      }
    },
    responses: {
      201: {
        description: 'User successfully registered and authenticated',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/signupResponse' }
          }
        }
      },
      400: {
        description: 'Invalid Request',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string', example: 'Missing param in request body' }
              },
              required: ['error']
            }
          }
        }
      },
      409: {
        description: 'Conflict',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Received email: user@mail.com is already in use'
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

/**
 * POST::/signin route specification
 */
export const signinPath = {
  post: {
    tags: ['User'],
    summary: 'User authentication route',
    requestBody: {
      required: true,
      description:
        "Sign In path must receive the user's credentials to generate the authentication token",
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/signinCredentials' } }
      }
    },
    responses: {
      200: {
        description: 'User successfully authenticated',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/signinResponse' }
          }
        }
      },
      400: {
        description: 'Invalid Request',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Received email: user@mail.com is not registered'
                }
              },
              required: ['error']
            }
          }
        }
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Received password for user: user@mail.com is unmatched'
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

/**
 * POST::/user route specification
 */
export const deleteUserPath = {
  delete: {
    tags: ['User'],
    security: [{ ApiKeyAuth: [] }],
    summary: 'User deletion route',
    parameters: [{ $ref: '#/components/parameters/accessToken' }],
    requestBody: {
      required: true,
      description:
        "User Deletion route must receive respective user's email and requires authentication",
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/userDeletionCredentials' } }
      }
    },
    responses: {
      204: {
        description: 'User successfully deleted'
      },
      409: {
        description: 'Conflict',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Received email: user@mail.com is not registered'
                }
              },
              required: ['error']
            }
          }
        }
      },
      401: {
        description:
          'Unauthorized - 401 Will be returned when a user authenticated try to delete any user other than himself',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Unauthorized deletion for user with email: user@mail.com'
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

/**
 * POST::/user/password route specification
 */
export const updatePasswdPath = {
  put: {
    tags: ['User'],
    security: [{ ApiKeyAuth: [] }],
    summary: 'User update password route',
    parameters: [{ $ref: '#/components/parameters/accessToken' }],
    requestBody: {
      required: true,
      description:
        "User update password route must receive respective user's current password and the new password and requires authentication",
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/updatePasswdCredentials' } }
      }
    },
    responses: {
      204: {
        description: 'User successfully deleted'
      },
      409: {
        description: 'Conflict',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Received email: user@mail.com is not registered'
                }
              },
              required: ['error']
            }
          }
        }
      },
      401: {
        description:
          'Unauthorized - 401 Will be returned when a user authenticated try to delete any user other than himself',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Unauthorized deletion for user with email: user@mail.com'
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
