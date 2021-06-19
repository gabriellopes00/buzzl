import { Evaluation } from '@/domain/evaluation/evaluation'
import { ListEvaluation } from '@/domain/evaluation/list-evaluation-by-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { EvaluationRepository } from '../ports/evaluation-repository'
import { ServiceRepository } from '../ports/service-repository'

export class DbListEvaluationByService implements ListEvaluation {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly evaluationRepository: EvaluationRepository
  ) {}

  public async list(service: string): Promise<Evaluation[] | UnregisteredApiKeyError> {
    const existingService = await this.serviceRepository.exists({ apiKey: service })
    if (!existingService) return new UnregisteredApiKeyError(service)

    const evaluations = await this.evaluationRepository.findAll(service)
    return evaluations
  }
}
