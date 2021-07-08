/**
 * Auth Token refers to the authentication component in the api
 */
export const authTokenComponent = {
  type: 'apiKey',
  in: 'header',
  name: 'access-token',
  description:
    'To access routes that requires authentication, user must send their generated jwt auth token in request header.'
}
