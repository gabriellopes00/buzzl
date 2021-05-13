import { LogDecorator } from '@/app/decorators/log-decorator'
import { Controller } from '@/presentation/ports/controllers'
import { Middleware } from '@/presentation/ports/middleware'

export const makeDecorator = (handler: Controller | Middleware) => new LogDecorator(handler)
