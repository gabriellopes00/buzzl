export interface Feedback {
  id: string
  category: 'COMMENT' | 'ISSUE' | 'IDEA' | 'OTHER'
  service: string
  content: string
  customerEmail?: string
}
