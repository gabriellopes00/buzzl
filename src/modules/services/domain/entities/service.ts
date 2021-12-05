import { Either, left, right } from '@/shared/either'
import { Entity } from '@/shared/entity'
import { ApiKey } from '../value-objects/api-key'
import { InvalidNameError } from '../value-objects/errors/invalid-name-error'
import { Name } from '../value-objects/name'

export interface ServiceData {
  name: string
  description?: string
  maintainerAccountId: string
  isActive: boolean
}

export interface ServiceErrors extends InvalidNameError {}

export class Service extends Entity<ServiceData> {
  private static _apiKey: string = null
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

  get apiKey() {
    return Service._apiKey
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

    this._apiKey = ApiKey.generate()

    const service = new Service(data, id)
    return right(service)
  }
}
