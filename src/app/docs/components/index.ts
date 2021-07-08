import { authTokenComponent } from './auth-token'
import { acessToken } from './params'

/**
 * Components holds various schemas for the specification.
 * @Reference https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#componentsObject
 */
export default {
  securitySchemes: {
    ApiKeyAuth: authTokenComponent
  },
  parameters: {
    accessToken: acessToken
  }
}
