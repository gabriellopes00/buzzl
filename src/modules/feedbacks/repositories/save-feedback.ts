import { Feedback } from '../domain/entities/feedback'

export interface SaveFeedbackRepository {
  save: (data: Feedback) => Promise<void>
}
