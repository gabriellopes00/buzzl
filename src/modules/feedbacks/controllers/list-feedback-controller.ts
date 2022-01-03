import { Controller } from '@/core/presentation/controllers'
import { HttpResponse } from '@/core/presentation/http'
import { Validator } from '@/core/presentation/validator'
import { badRequest, created, serverError } from '@/presentation/helpers/http'
import { Feedback, FeedbackCategory } from '../domain/entities/feedback'
import { ListFeedback, ListFeedbackParams } from '../usecases/list-feedback'

export interface ListFeedbackControllerParams extends ListFeedbackParams {}

export interface ListFeedbackControllerResponse {
  total: number
  categories: {
    ISSUE: { total: number; percent: number }
    IDEA: { total: number; percent: number }
    COMMENT: { total: number; percent: number }
    OTHER: { total: number; percent: number }
  }
  feedbacks: Feedback[]
}

export class ListFeedbackController implements Controller {
  constructor(private readonly validator: Validator, private readonly listFeedback: ListFeedback) {}

  public async handle(params: ListFeedbackControllerParams): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(params)
      if (error) return badRequest(error)

      const { serviceId } = params
      const listResult = await this.listFeedback.execute({ serviceId })
      if (listResult.isLeft()) return badRequest(listResult.value)

      const feedbacks = listResult.value
      return created(this.formatResponse(feedbacks))
    } catch (error) {
      return serverError(error)
    }
  }

  private formatResponse(feedbacks: Feedback[]): ListFeedbackControllerResponse {
    function count(arr: Feedback[], category: FeedbackCategory): number {
      return arr.filter(f => f.category === category).length
    }

    function percent(arr: Feedback[], category: FeedbackCategory): number {
      return Number(((count(arr, category) * 100) / arr.length).toFixed(2))
    }

    return {
      total: feedbacks.length,
      categories: {
        ISSUE: { total: count(feedbacks, 'ISSUE'), percent: percent(feedbacks, 'ISSUE') },
        OTHER: { total: count(feedbacks, 'OTHER'), percent: percent(feedbacks, 'OTHER') },
        IDEA: { total: count(feedbacks, 'IDEA'), percent: percent(feedbacks, 'IDEA') },
        COMMENT: { total: count(feedbacks, 'COMMENT'), percent: percent(feedbacks, 'COMMENT') }
      },
      feedbacks
    }
  }
}
