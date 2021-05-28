import { PgServiceRepository } from '@/infra/database/repositories/service-repository'
import { ListServiceByUserController } from '@/presentation/controllers/service/list-service-by-user'
import { DbListServiceByUser } from '@/usecases/service/list-service-by-user'
import { makeDecorator } from '../factory'

const dbListServiceByUser = new DbListServiceByUser(new PgServiceRepository())
export const listServiceByUserController = makeDecorator(
  new ListServiceByUserController(dbListServiceByUser)
)
