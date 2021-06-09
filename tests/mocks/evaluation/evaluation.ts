import { EvaluationParams } from '@/domain/evaluation/add-evaluation'
import { Evaluation } from '@/domain/evaluation/evaluation'
import { fakeService } from '../service/service'

export const fakeEvaluation: Evaluation = {
  id: 'f0fdae2f-cb86-4df4-956e-19e442ae2b29',
  service: fakeService.apiKey,
  rating: 9
}

export const fakeEvaluationParams: EvaluationParams = {
  service: fakeService.apiKey,
  rating: 9
}
