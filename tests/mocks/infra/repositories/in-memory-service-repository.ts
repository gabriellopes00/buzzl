import { Service } from '@/modules/services/domain/entities/service'
import { CreateServiceRepository } from '@/modules/services/repositories/create-service-repository'
import { LoadServiceRepository } from '@/modules/services/repositories/load-service-repository'

/**
 * InMemoryServiceRepository is a fake implementation for the repositories interfaces.
 * All the register are stored in an array in memory.
 */
export class InMemoryServiceRepository implements CreateServiceRepository, LoadServiceRepository {
  constructor(public rows: Service[] = []) {}

  /**
   * Implemented from CreateServiceRepository.
   * This method register a service in the memory.
   * @param data Service data
   */
  public async create(data: Service): Promise<void> {
    const index = this.rows.findIndex(row => row.id === data.id)
    if (index === -1) this.rows.push(data)
    else this.rows[index] = data
  }

  /**
   * Implemented from LoadServiceRepository.
   * This method finds a service by a given id.
   * @param id Search argument
   */
  public async findById(id: string): Promise<Service> {
    const index = this.rows.findIndex(row => row.id === id)
    if (index === -1) return null
    return this.rows.slice(index, 1)[0]
  }

  /**
   * Truncate is a helper method used to clear the register in memory.
   */
  public truncate(): void {
    this.rows = []
  }
}
