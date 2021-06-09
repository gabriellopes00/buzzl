import { AddEvaluation, EvaluationParams } from '@/domain/evaluation/add-evaluation'
import { InactiveServiceError } from '@/domain/service/errors/inactive-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { EvaluationRepository } from '../ports/evaluation-repository'
import { ServiceRepository } from '../ports/service-repository'
import { UUIDGenerator } from '../ports/uuid-generator'

export class DbAddEvaluation implements AddEvaluation {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly uuidGenerator: UUIDGenerator,
    private readonly evaluationRepository: EvaluationRepository
  ) {}

  public async add(
    data: EvaluationParams
  ): Promise<void | UnregisteredApiKeyError | InactiveServiceError> {
    const service = await this.serviceRepository.findOne({ apiKey: data.service })
    if (!service) return new UnregisteredApiKeyError(data.service)
    else if (!service.isActive) return new InactiveServiceError(data.service)

    const id = this.uuidGenerator.generate()
    await this.evaluationRepository.add({ ...data, id })
  }
}
