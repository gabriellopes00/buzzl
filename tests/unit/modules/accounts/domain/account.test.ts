import { Account, AccountData } from '@/modules/accounts/domain/entities/account'
import { Email } from '@/modules/accounts/domain/value-objects/email'
import { InvalidEmailError } from '@/modules/accounts/domain/value-objects/errors/invalid-email-error'
import { Name } from '@/modules/accounts/domain/value-objects/name'
import { Password } from '@/modules/accounts/domain/value-objects/password'

describe('Account Entity', () => {
  test('Should create an account if receive all properties valid', () => {
    const properties: AccountData = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'secret'
    }
    const accountResult = Account.create(properties, 'fake_uuid')
    expect(accountResult.isRight).toBeTruthy()
    expect(accountResult.value.name).toBe(properties.name)
  })

  test('Should reject account creation if receive some invalid property', () => {
    const properties: AccountData = {
      name: 'John Doe',
      email: 'johndoemail.com', // invalid
      password: 'secret'
    }
    const accountResult = Account.create(properties, 'fake_uuid')
    expect(accountResult.isLeft).toBeTruthy()
    expect(accountResult.value).toBeInstanceOf(InvalidEmailError)
  })

  describe('Email', () => {
    it('Should create an email on success', () => {
      expect(Email.create('johndoe@mail.com').isRight()).toBeTruthy()
    })

    it('Should reject if try to create an invalid email', () => {
      expect(Email.create('johndoemail.com').isLeft()).toBeTruthy()
      expect(Email.create('johndoe@mailcom').isLeft()).toBeTruthy()
      expect(Email.create('johndoe@mail.').isLeft()).toBeTruthy()
      expect(Email.create('@mail.com').isLeft()).toBeTruthy()
      expect(Email.create(`johndoe@${'d'.repeat(260)}.com`).isLeft).toBeTruthy()
      expect(Email.create(`${'a'.repeat(260)}@mail.com`).isLeft).toBeTruthy()
    })
  })
  describe('Password', () => {
    it('Should create a gender if receives a valid one', async () => {
      expect(Password.create('my_secret_password').isRight()).toBeTruthy()
    })

    it('Should reject a gender if receives a invalid one', async () => {
      expect(Password.create('p'.repeat(260)).isLeft()).toBeTruthy()
      expect(Password.create('  pas').isLeft()).toBeTruthy()
      expect(Password.create('pas').isLeft()).toBeTruthy()
      expect(Password.create(null).isLeft()).toBeTruthy()
      expect(Password.create(undefined).isLeft()).toBeTruthy()
    })
  })

  describe('Name', () => {
    it('Should create a gender if receives a valid one', async () => {
      expect(Name.create('John Doe').isRight()).toBeTruthy()
    })

    it('Should reject a gender if receives a invalid one', async () => {
      expect(Name.create('  Jo').isLeft()).toBeTruthy()
      expect(Name.create('J'.repeat(260)).isLeft()).toBeTruthy()
      expect(Name.create('Jo]n§=¨5¨# Doeºª').isLeft()).toBeTruthy()
      expect(Name.create(null).isLeft()).toBeTruthy()
      expect(Name.create(undefined).isLeft()).toBeTruthy()
    })
  })
})
