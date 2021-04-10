import { DbAddUser } from '@/implementation/usecases/add-user'
import { fakeUser } from '../mocks/user'
import { MockUserRepository } from '../mocks/user-repository'

describe('AddUser Usecase', () => {
  const mockUserRepository = new MockUserRepository() as jest.Mocked<MockUserRepository>
  const sut = new DbAddUser(mockUserRepository)

  it('Should call UserRepository with correct values', async () => {
    const addFunc = jest.spyOn(mockUserRepository, 'add')
    await sut.add(fakeUser)
    expect(addFunc).toBeCalledWith(fakeUser)
  })
})
