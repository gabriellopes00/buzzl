import { Evaluation } from '@/domain/evaluation/evaluation'
import { ListEvaluation } from '@/domain/evaluation/list-evaluation-by-service'
import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { EvaluationRepository } from '../ports/evaluation-repository'
import { ServiceRepository } from '../ports/service-repository'

export class DbListEvaluationByService implements ListEvaluation {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly evaluationRepository: EvaluationRepository
  ) {}

  public async list(data: {
    service: string
    userId: string
  }): Promise<Evaluation[] | UnregisteredApiKeyError | UnauthorizedMaintainerError> {
    const { service, userId } = data

    const existingService = await this.serviceRepository.findOne({ apiKey: service })
    if (!existingService) return new UnregisteredApiKeyError(service)
    else if (userId !== existingService.maintainer) return new UnauthorizedMaintainerError(service)

    const evaluations = await this.evaluationRepository.findAll(service)
    return evaluations
  }
}
