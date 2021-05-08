import { Service } from '@/domain/entities/service'

export interface AddServiceDto extends Omit<Service, 'id' | 'apiKey' | 'isActive'> {}
