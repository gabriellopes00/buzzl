import { InvalidEmailError } from '@/modules/accounts/domain/value-objects/errors/invalid-email-error'
import { Name } from '@/modules/accounts/domain/value-objects/name'
import { Service, ServiceData } from '@/modules/services/domain/entities/service'

describe('Service Entity', () => {
  test('Should create a service if receive all properties valid', () => {
    const properties: ServiceData = {
      name: 'My Service',
      isActive: true,
      description: 'lorem ipsum dolor sit amet...',
      maintainerAccountId: '0e2d963c-75bb-450a-9aa1-2f9856346a6b'
    }
    const accountResult = Service.create(properties, 'uuid')
    expect(accountResult.isRight).toBeTruthy()
    expect(accountResult.value.name).toBe(properties.name)
  })

  test('Should reject account creation if receive some invalid property', () => {
    const properties: ServiceData = {
      name: 'My Service',
      isActive: true,
      description: 'lorem ipsum dolor sit amet...',
      maintainerAccountId: '0e2d963c-75bb-450a-9aa1-2f9856346a6b'
    }
    const accountResult = Service.create(properties, 'uuid')
    expect(accountResult.isLeft()).toBeTruthy()
    expect(accountResult.value).toBeInstanceOf(InvalidEmailError)
  })

  describe('Name', () => {
    it('Should create a gender if receives a valid one', async () => {
      expect(Name.create('My Service').isRight()).toBeTruthy()
    })

    it('Should reject a gender if receives a invalid one', async () => {
      expect(Name.create('  Se').isLeft()).toBeTruthy()
      expect(Name.create('S'.repeat(260)).isLeft()).toBeTruthy()
      expect(Name.create('My]§=¨5¨# Serviceºª').isLeft()).toBeTruthy()
      expect(Name.create(null).isLeft()).toBeTruthy()
      expect(Name.create(undefined).isLeft()).toBeTruthy()
    })
  })
})
