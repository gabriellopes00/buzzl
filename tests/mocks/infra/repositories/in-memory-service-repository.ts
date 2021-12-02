import { Service } from '@/modules/services/domain/entities/service'
import { CreateServiceRepository } from '@/modules/services/repositories/create-service-repository'

/**
 * InMemoryServiceRepository is a fake implementation for the repositories interfaces.
 * All the register are stored in an array in memory.
 */
export class InMemoryServiceRepository implements CreateServiceRepository {
  constructor(public rows: Service[] = []) {}

  /**
   * Implemented from CreateServiceRepository.
   * This method register a service in the memory.
   * @param data Service data
   */
  public async create(data: Service): Promise<void> {
    this.rows.push(data)
  }

  /**
   * Truncate is a helper method used to clear the register in memory.
   */
  public truncate(): void {
    this.rows = []
  }
}
