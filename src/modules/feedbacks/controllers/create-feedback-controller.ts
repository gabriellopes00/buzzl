import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/core/presentation/http'
import { Validator } from '@/core/presentation/validator'
import { badRequest, created, serverError } from '@/presentation/helpers/http'
import { CreateFeedback, CreateFeedbackParams } from '../usecases/create-feedback'

export interface CreateFeedbackControllerParams
  extends Omit<CreateFeedbackParams, 'isPrivate' | 'serviceId'> {
  service_id: string
  is_private: boolean
}

export class CreateFeedbackController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly createFeedback: CreateFeedback
  ) {}

  public async handle(params: CreateFeedbackControllerParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)

      const {
        category,
        title,
        is_private: isPrivate,
        content,
        service_id: serviceId,
        author
      } = params
      const feedback = await this.createFeedback.execute({
        category,
        title,
        isPrivate,
        content,
        serviceId,
        author
      })
      return created({ feedback })
    } catch (error) {
      return serverError(error)
    }
  }
}
