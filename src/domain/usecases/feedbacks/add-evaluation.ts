import { Evaluation } from '../../entities/evaluation'

export interface AddEvaluation {
  add(data: Evaluation): Promise<Evaluation>
}
