export interface DeleteService {
  delete(serviceId: string): Promise<boolean>
}
