import { Controller } from '@/presentation/ports/controllers'
import { Middleware } from '@/presentation/ports/middleware'

export const makeDecorator = (handler: Controller | Middleware) => handler
