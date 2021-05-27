import { Feedback } from '@/domain/feedback/feedback'

export interface FeedbackRepository {
  add(data: Feedback): Promise<void>
  findAll(criteria?: { service: string }): Promise<Feedback[]>
}