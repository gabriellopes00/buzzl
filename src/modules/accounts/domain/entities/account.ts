import { Either, left, right } from '@/shared/either'
import { Entity } from '@/shared/entity'
import { Email } from '../value-objects/email'
import { InvalidEmailError } from '../value-objects/errors/invalid-email-error'
import { InvalidNameError } from '../value-objects/errors/invalid-name-error'
import { InvalidPasswordError } from '../value-objects/errors/invalid-password-error'
import { Name } from '../value-objects/name'
import { Password } from '../value-objects/password'

export interface AccountData {
  name: string
  email: string
  password: string
}

export interface AccountErrors extends InvalidEmailError, InvalidNameError, InvalidPasswordError {}

export class Account extends Entity<AccountData> {
  get id() {
    return this._id
  }

  get name() {
    return this.data.name
  }

  get email() {
    return this.data.email
  }

  get password() {
    return this.data.password
  }

  set password(hash: string) {
    this.data.password = hash
  }

  get createdAt() {
    return this._createdAt
  }

  private constructor(data: AccountData, id: string) {
    super(data, id)
  }

  static create(data: AccountData, id: string): Either<AccountErrors, Account> {
    const nameResult = Name.create(data.name)
    if (nameResult.isLeft()) return left(nameResult.value)

    const emailResult = Email.create(data.email)
    if (emailResult.isLeft()) return left(emailResult.value)

    const passwordResult = Password.create(data.password)
    if (passwordResult.isLeft()) return left(passwordResult.value)

    const account = new Account(data, id)
    return right(account)
  }

  static adapt(data: AccountData & { id: string }): Account {
    return new Account(data, data.id)
  }
}
