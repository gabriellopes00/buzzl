import { Feedback } from '@/domain/feedback/feedback'
import { ListFeedbackByService } from '@/domain/feedback/list-feedback-by-service'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers/http'
import { Controller } from '@/presentation/ports/controllers'
import { HttpResponse } from '@/presentation/ports/http'
import { Validator } from '@/presentation/ports/validator'

export interface CategoryData {
  count: number
  percent: number
}

export interface ListFeedbackResponse {
  count: number
  categories: {
    ISSUE: CategoryData
    IDEA: CategoryData
    COMMENT: CategoryData
    OTHER: CategoryData
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

      function count(arr: Feedback[], category: 'ISSUE' | 'OTHER' | 'IDEA' | 'COMMENT'): number {
        return arr.filter(f => f.category === category).length
      }

      function percent(arr: Feedback[], category: 'ISSUE' | 'OTHER' | 'IDEA' | 'COMMENT'): number {
        return Number(((count(arr, category) * 100) / arr.length).toFixed(2))
      }

      const response: ListFeedbackResponse = {
        count: listResult.length,
        categories: {
          ISSUE: { count: count(listResult, 'ISSUE'), percent: percent(listResult, 'ISSUE') },
          OTHER: { count: count(listResult, 'OTHER'), percent: percent(listResult, 'OTHER') },
          IDEA: { count: count(listResult, 'IDEA'), percent: percent(listResult, 'IDEA') },
          COMMENT: { count: count(listResult, 'COMMENT'), percent: percent(listResult, 'COMMENT') }
        },
        feedbacks: listResult
      }

      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}
