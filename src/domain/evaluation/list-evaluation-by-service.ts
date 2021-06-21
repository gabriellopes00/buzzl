import { UnauthorizedMaintainerError } from '../service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '../service/errors/unregistered-api-key'
import { Evaluation } from './evaluation'

export interface ListEvaluation {
  list(data: {
    service: string
    userId: string
  }): Promise<Evaluation[] | UnregisteredApiKeyError | UnauthorizedMaintainerError>
}
