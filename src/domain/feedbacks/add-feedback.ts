import { Feedback } from './feedback'

export interface AddFeedback {
  add(data: Feedback): Promise<Feedback>
}
