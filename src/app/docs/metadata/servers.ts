/**
 * Servers definition specifies the API servers and base URLs
 * @Reference https://swagger.io/docs/specification/api-host-and-base-path/
 *  */
export default [
  {
    url: 'https://feedbackio-api.herokuapp.com',
    description: 'Production server hosted at heroku'
  },
  {
    url: 'http://localhost',
    description: 'Local server running on localhost'
  }
]
