import { evaluationPath, getNPSPath } from './evaluation'
import { feedbackPath } from './feedback'
import { newServiceApiKeyPath, servicePath, transferServicePath } from './service'
import { deleteUserPath, signinPath, signupPath, updatePasswdPath } from './user'

/**
 * Paths contain the api routes
 * @Reference https://swagger.io/docs/specification/paths-and-operations/
 */
export default {
  '/signup': signupPath,
  '/signin': signinPath,
  '/user': deleteUserPath,
  '/user/password': updatePasswdPath,

  '/feedback': feedbackPath,

  '/evaluation': evaluationPath,
  '/evaluation/nps': getNPSPath,

  '/service': servicePath,
  '/service/api-key/new': newServiceApiKeyPath,
  '/service/transfer': transferServicePath
}
