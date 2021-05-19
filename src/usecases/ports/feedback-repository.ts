import { Feedback } from '@/domain/feedback/feedback'

export interface FeedbackRepository {
  add(data: Feedback): Promise<void>
}
