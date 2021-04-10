import { Feedback } from '../models/feedback'

export interface AddFeedback {
  add(data: Feedback): Promise<Feedback>
}
