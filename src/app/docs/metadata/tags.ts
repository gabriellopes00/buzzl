/**
 * Tags are used to group routes by specific contexts
 * @Reference https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#tagObject
 *  */
export default [
  {
    name: 'User',
    description: 'References to users actions in the API'
  },
  {
    name: 'Service',
    description: 'References to services owned by the users'
  },
  {
    name: 'Feedback',
    description: "References to the service's received feedbacks"
  },
  {
    name: 'Evaluation',
    description: "References to the service's received evaluations"
  }
]
