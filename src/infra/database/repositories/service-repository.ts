import { Service } from '@/domain/service/service'
import { ServiceJoinMaintainer, ServiceRepository } from '@/usecases/ports/service-repository'
import { getRepository } from 'typeorm'
import { ServiceModel } from '../models/service'

export class PgServiceRepository implements ServiceRepository {
  public async add(data: Service): Promise<Service> {
    const repository = getRepository(ServiceModel)
    return await repository.save(repository.create(data))
  }

  public async findOneJoinMaintainer(criteria: {
    id?: string
    apiKey?: string
  }): Promise<ServiceJoinMaintainer> {
    const repository = getRepository(ServiceModel)
    // if (id) {
    //   console.log(id)
    //   console.log(
    //     await repository.findOne({
    //       where: { id },
    //       join: { alias: 'maintainer', innerJoinAndSelect: { maintainer: '' } }
    //     })
    //   )
    // }
    console.log(
      // await repository
      //   .createQueryBuilder('service')
      //   // .innerJoinAndSelect('service.maintainer', 'user.id')
      //   .where('service.id = :id', { id: '00add28c-9f40-4123-a2f8-0e0bcfce5e1e' })
      //   .getOne()
      await repository.query(
        'select service.name, service.id, service."apiKey",  maintainer.email as maintaineremail,maintainer.name as maintianername from "service" as service join "user" as maintainer on maintainer.id = service.maintainer      where service.id = \'00add28c-9f40-4123-a2f8-0e0bcfce5e1e\';'
      )
    )
    return null
    // else if (apiKey) return !!(await repository.findOne({ where: { apiKey: apiKey } }))
  }

  public async delete(criteria: { id?: string; apiKey?: string }): Promise<void> {
    const repository = getRepository(ServiceModel)
    const { id, apiKey } = criteria

    if (id) await repository.delete({ id })
    else if (apiKey) await repository.delete({ apiKey })
  }
}
