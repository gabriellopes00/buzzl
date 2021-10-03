export abstract class Entity<T> {
  protected readonly _id: string = null
  protected readonly _createdAt: Date = null

  public readonly data: T

  constructor(data: T, id: string) {
    this._id = id
    this.data = data
    this._createdAt = new Date()
  }

  get id() {
    return this._id
  }

  get createdAt() {
    return this._createdAt
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!(object instanceof Entity)) {
      return false
    }

    return this._id === object._id
  }
}
