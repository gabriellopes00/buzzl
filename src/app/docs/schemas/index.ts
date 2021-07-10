import {
  addFeedbackCredentials,
  deleteFeedbackCredentials,
  feedback,
  listFeedbackCredentials,
  listFeedbackResponse
} from './feedback'
import {
  signinResponse,
  signupResponse,
  signupCredentials,
  signinCredentials,
  userDeletionCredentials,
  updatePasswdCredentials
} from './user'

/**
 * Schemas are the specification of the objects received and returned by the api
 * @Reference https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject
 */
export default {
  signupCredentials: signupCredentials,
  signupResponse: signupResponse,
  signinResponse: signinResponse,
  signinCredentials: signinCredentials,
  userDeletionCredentials: userDeletionCredentials,
  updatePasswdCredentials: updatePasswdCredentials,

  addFeedbackCredentials: addFeedbackCredentials,
  feedback: feedback,
  listFeedbackResponse: listFeedbackResponse,
  listFeedbackCredentials: listFeedbackCredentials,
  deleteFeedbackCredentials: deleteFeedbackCredentials
}
