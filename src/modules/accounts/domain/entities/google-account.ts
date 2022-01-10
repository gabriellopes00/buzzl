import { Entity } from '@/shared/entity'

export interface GoogleAccountData {
  googleId: string
  name: string
  email: string
}

export class GoogleAccount extends Entity<GoogleAccountData> {
  get id() {
    return this._id
  }

  get name() {
    return this.data.name
  }

  get email() {
    return this.data.email
  }

  get googleId() {
    return this.data.googleId
  }

  get createdAt() {
    return this._createdAt
  }

  private constructor(data: GoogleAccountData, id: string) {
    super(data, id)
  }

  static create(data: GoogleAccountData, id: string): GoogleAccount {
    const account = new GoogleAccount(data, id)
    return account
  }

  static adapt(data: GoogleAccountData & { id: string }): GoogleAccount {
    return new GoogleAccount(data, data.id)
  }
}
