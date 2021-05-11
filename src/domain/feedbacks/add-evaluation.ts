import { Evaluation } from './evaluation'

export interface AddEvaluation {
  add(data: Evaluation): Promise<Evaluation>
}
