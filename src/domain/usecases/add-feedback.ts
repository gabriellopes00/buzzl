import { Feedback } from '../entities/feedback'

export interface AddFeedback {
  add(data: Feedback): Promise<Feedback>
}
