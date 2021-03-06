import { Either, left, right } from '@/shared/either'
import { Entity } from '@/shared/entity'
import { InvalidNameError } from '../value-objects/errors/invalid-name-error'
import { Name } from '../value-objects/name'

export interface ServiceData {
  name: string
  description?: string
  maintainerAccountId: string
  isActive?: boolean
}

export interface ServiceErrors extends InvalidNameError {}

export class Service extends Entity<ServiceData> {
  get id() {
    return this._id
  }

  get name() {
    return this.data.name
  }

  set name(value: string) {
    this.data.name = value
  }

  get description() {
    return this.data?.description
  }

  set description(value: string) {
    this.data.description = value
  }

  get maintainerAccountId() {
    return this.data.maintainerAccountId
  }

  get isActive() {
    return this.data.isActive
  }

  set isActive(value: boolean) {
    this.data.isActive = value
  }

  get createdAt() {
    return this._createdAt
  }

  private constructor(data: ServiceData, id: string) {
    super(data, id)
  }

  static create(data: ServiceData, id: string): Either<ServiceErrors, Service> {
    const nameResult = Name.create(data.name)
    if (nameResult.isLeft()) return left(nameResult.value)

    if (data.isActive !== false && data.isActive !== true) data.isActive = true

    const service = new Service(data, id)
    return right(service)
  }

  static adapt(data: ServiceData & { id: string }): Service {
    const service = new Service(data, data.id)
    return service
  }
}
