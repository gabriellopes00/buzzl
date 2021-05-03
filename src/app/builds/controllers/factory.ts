import { ControllerDecorator } from '@/app/decorators/controller-decorator'
import { Controller } from '@/presentation/ports/controllers'

export const makeController = (controller: Controller) => new ControllerDecorator(controller)
