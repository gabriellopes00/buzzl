import { Evaluation } from '../models/evaluation'

export interface AddEvaluation {
  add(data: Evaluation): Promise<Evaluation>
}
