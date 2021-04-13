import { DbAddUser } from '@/usecases/implementation/add-user'
import { fakeUser, fakeUserParams } from '../mocks/user'
import { MockUserRepository } from '../mocks/user-repository'
import { MockUUIDGenerator } from '../mocks/uuid-generator'

describe('AddUser Usecase', () => {
  const mockUserRepository = new MockUserRepository() as jest.Mocked<MockUserRepository>
  const mockUUIDGenerator = new MockUUIDGenerator() as jest.Mocked<MockUUIDGenerator>
  const sut = new DbAddUser(mockUUIDGenerator, mockUserRepository)

  describe('UUID Generator', () => {
    it('Should call UUIDGenerator once', async () => {
      const generateSpy = jest.spyOn(mockUUIDGenerator, 'generate')
      await sut.add(fakeUserParams)
      expect(generateSpy).toHaveBeenCalled()
    })
  })

  describe('User Repository', () => {
    it('Should call UserRepository with correct values', async () => {
      const addFunc = jest.spyOn(mockUserRepository, 'add')
      await sut.add(fakeUserParams)
      // ensure UserRepository have been called with above generated UUID
      expect(addFunc).toHaveBeenCalledWith({ ...fakeUserParams, id: mockUUIDGenerator.generate() })
    })

    it('Should return a user data if UserRepository succeeds', async () => {
      const data = await sut.add(fakeUser)
      expect(data).toEqual(fakeUser)
    })

    it('Should pass long the error if UserRepository returns one', async () => {
      mockUserRepository.add.mockRejectedValueOnce(new Error())
      const error = sut.add(fakeUser)
      await expect(error).rejects.toThrow()
    })
  })
})
