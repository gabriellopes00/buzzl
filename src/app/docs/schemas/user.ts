/**
 * Sign Up credentials refers to expected data on POST::/signup route
 */
export const signupCredentials = {
  type: 'object',
  properties: {
    name: { type: 'string', example: 'User Name', maxLength: 255, minLength: 2 },
    email: {
      type: 'string',
      format: 'email',
      example: 'user@mail.com',
      maxLength: 256,
      pattern:
        "/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/"
    },
    password: { type: 'string', example: '_secret_userpass1234', maxLength: 255, minLength: 4 }
  },
  required: ['name', 'email', 'password']
}

/**
 * Sign Up response refers to the success response on POST::/signup route
 */
export const signupResponse = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' },
        name: { type: 'string', example: 'User Name' },
        email: { type: 'string', example: 'user@mail.com', format: 'email' }
      }
    },
    accessToken: {
      type: 'string',
      format: 'jwt',
      example:
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTYiLCJpYXQiOjE1MTYyMzkwMjJ9.bTeeS-YA-H70CUiY6p1hYxcLPYK3rxG8g6iFcNratjjEmIdtiLXHKLIUOxBIqhNUi-tEMpDIZqnrf3Ps_yyfcZe3dMT8-ZBQIMpPPkAOvjKwwyUYxYWS9Layg4xDmBdhefGVBheAnsHW9glcc18Nz9W16jukGPLzBeqR3MB5UjOvZCmw5QAZkkavxHPPfEspe5JUyXo9IfLN6p9ZjjCtB1E5-oj5ZkouuyQo-ic68jxkPNe0jsAJjWp-4Hz-kjqrYhJxOGgtznc4DsB4HZKX1FY1Y9k6WompKn0ah8dG0mlRLwGYSKyfDj3PHvPnrLcSuPjNlWFCDIVgqx5sg8YCew'
    }
  },
  required: ['user', 'accessToken']
}

/**
 * Sign In credentials refers to expected data on POST::/signin route
 */
export const signinCredentials = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      example: 'user@mail.com',
      maxLength: 256,
      pattern:
        "/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/"
    },
    password: { type: 'string', example: '_secret_userpass1234', maxLength: 255, minLength: 4 }
  },
  required: ['email', 'password']
}

/**
 * Sign In response refers to the success response on POST::/signin route
 */
export const signinResponse = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
      format: 'jwt',
      example:
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTYiLCJpYXQiOjE1MTYyMzkwMjJ9.bTeeS-YA-H70CUiY6p1hYxcLPYK3rxG8g6iFcNratjjEmIdtiLXHKLIUOxBIqhNUi-tEMpDIZqnrf3Ps_yyfcZe3dMT8-ZBQIMpPPkAOvjKwwyUYxYWS9Layg4xDmBdhefGVBheAnsHW9glcc18Nz9W16jukGPLzBeqR3MB5UjOvZCmw5QAZkkavxHPPfEspe5JUyXo9IfLN6p9ZjjCtB1E5-oj5ZkouuyQo-ic68jxkPNe0jsAJjWp-4Hz-kjqrYhJxOGgtznc4DsB4HZKX1FY1Y9k6WompKn0ah8dG0mlRLwGYSKyfDj3PHvPnrLcSuPjNlWFCDIVgqx5sg8YCew'
    }
  },
  required: ['accessToken']
}

/**
 * User Deletion credentials refers to expected data on DELETE::/user route
 */
export const userDeletionCredentials = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      example: 'user@mail.com',
      maxLength: 256,
      pattern:
        "/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/"
    }
  },
  required: ['email']
}

/**
 * Sign in credentials refers to expected data on PUT::/user/password route
 */
export const updatePasswdCredentials = {
  type: 'object',
  properties: {
    newPass: { type: 'string', example: '_new_secret_userpass1234', maxLength: 255, minLength: 4 },
    currentPass: {
      type: 'string',
      example: '_old_secret_userpass1234',
      maxLength: 255,
      minLength: 4
    }
  },
  required: ['newPass', 'currentPass']
}
