import { Service } from '@/modules/services/domain/entities/service'
import { SaveServiceRepository } from '@/modules/services/repositories/save-service-repository'
import { FindServiceRepository } from '@/modules/services/repositories/find-service-repository'

/**
 * InMemoryServiceRepository is a fake implementation for the repositories interfaces.
 * All the register are stored in an array in memory.
 */
export class InMemoryServiceRepository implements SaveServiceRepository, FindServiceRepository {
  constructor(public rows: Service[] = []) {}

  /**
   * Implemented from SaveServiceRepository.
   * This method register a service in the memory. If the service is already registered
   * it will updated services' credentials.
   * @param data Service data
   */
  public async save(data: Service): Promise<void> {
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
   * Implemented from LoadServiceRepository.
   * This method finds a service by a given id.
   * @param id Search argument
   */
  public async findAll(criteria?: { maintainerAccountId: string }): Promise<Service[]> {
    if (criteria) {
      return this.rows.filter(row => row.maintainerAccountId === criteria.maintainerAccountId)
    } else return this.rows
  }

  /**
   * Truncate is a helper method used to clear the register in memory.
   */
  public truncate(): void {
    this.rows = []
  }
}
