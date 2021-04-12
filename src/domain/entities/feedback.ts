export enum FeedbackCategory {
  // eslint-disable-next-line
  COMMENT = 'COMMENT',
  // eslint-disable-next-line
  COMPLAINT = 'COMPLAINT',
  // eslint-disable-next-line
  IDEA = 'IDEA',
  // eslint-disable-next-line
  OTHER = 'OTHER'
}

export interface Feedback {
  id: string
  category: FeedbackCategory
  service: string
  clientEmail?: string
}
