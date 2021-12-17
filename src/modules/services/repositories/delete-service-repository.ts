export interface DeleteServiceRepository {
  delete(serviceId: string): Promise<void>
}
