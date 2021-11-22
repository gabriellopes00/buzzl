import { Feedback } from '@/domain/feedback/feedback'
import { ListFeedbackByService } from '@/domain/feedback/list-feedback-by-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers/http'
import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Validator } from '@/presentation/ports/validator'

export interface ListFeedbackResponse {
  count: number
  categories: {
    ISSUE: { count: number; percent: number }
    IDEA: { count: number; percent: number }
    COMMENT: { count: number; percent: number }
    OTHER: { count: number; percent: number }
  }
  feedbacks: Feedback[]
}

export class ListFeedbackByServiceController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly listFeedback: ListFeedbackByService
  ) {}

  public async handle(request: { service: string }): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request)
      if (validationResult instanceof Error) return badRequest(validationResult)

      const listResult = await this.listFeedback.list(request.service)
      if (listResult instanceof UnregisteredApiKeyError) return badRequest(listResult)
      else if (listResult == null) return noContent()

      const response = this.formatResponse(listResult)

      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }

  private formatResponse(feedbacks: Feedback[]): ListFeedbackResponse {
    function count(arr: Feedback[], category: 'ISSUE' | 'OTHER' | 'IDEA' | 'COMMENT'): number {
      return arr.filter(f => f.category === category).length
    }

    function percent(arr: Feedback[], category: 'ISSUE' | 'OTHER' | 'IDEA' | 'COMMENT'): number {
      return Number(((count(arr, category) * 100) / arr.length).toFixed(2))
    }

    return {
      count: feedbacks.length,
      categories: {
        ISSUE: { count: count(feedbacks, 'ISSUE'), percent: percent(feedbacks, 'ISSUE') },
        OTHER: { count: count(feedbacks, 'OTHER'), percent: percent(feedbacks, 'OTHER') },
        IDEA: { count: count(feedbacks, 'IDEA'), percent: percent(feedbacks, 'IDEA') },
        COMMENT: { count: count(feedbacks, 'COMMENT'), percent: percent(feedbacks, 'COMMENT') }
      },
      feedbacks
    }
  }
}
