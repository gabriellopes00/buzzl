import { Feedback } from '../domain/entities/feedback'

export interface FindFeedbackRepository {
  findAll: (criteria?: { serviceId: string }) => Promise<Feedback[]>
}
