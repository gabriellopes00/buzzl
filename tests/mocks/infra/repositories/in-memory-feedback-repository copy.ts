import { Feedback } from '@/modules/feedbacks/domain/entities/feedback'
import { SaveFeedbackRepository } from '@/modules/feedbacks/repositories/save-feedback'
import { Service } from '@/modules/services/domain/entities/service'

/**
 * InMemoryFeedbackRepository is a fake implementation for the repositories interfaces.
 * All the register are stored in an array in memory.
 */
export class InMemoryFeedbackRepository implements SaveFeedbackRepository {
  constructor(public rows: Feedback[] = []) {}

  /**
   * Implemented from SaveServiceRepository.
   * This method register a service in the memory. If the service is already registered
   * it will updated services' credentials.
   * @param data Service data
   */
  public async save(data: Feedback): Promise<void> {
    const index = this.rows.findIndex(row => row.id === data.id)
    if (index === -1) this.rows.push(data)
    else this.rows[index] = data
  }

  /**
   * Truncate is a helper method used to clear the register in memory.
   */
  public truncate(): void {
    this.rows = []
  }
}
