import { Evaluation } from '@/domain/evaluation/evaluation'

export interface EvaluationRepository {
  add(data: Evaluation): Promise<void>
  findAll(serviceKey: string): Promise<Evaluation[]>
}
