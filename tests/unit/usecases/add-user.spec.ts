import { ExistingEmailError } from '@/domain/usecases/errors/user/existing-email'
import { DbAddUser } from '@/usecases/implementation/add-user'
import { fakeUser, fakeUserParams } from '../mocks/user'
import { MockUserRepository } from '../mocks/user-repository'
import { MockUUIDGenerator } from '../mocks/uuid-generator'

describe('AddUser Usecase', () => {
  const mockUserRepository = new MockUserRepository() as jest.Mocked<MockUserRepository>
  const mockUUIDGenerator = new MockUUIDGenerator() as jest.Mocked<MockUUIDGenerator>
  const sut = new DbAddUser(mockUUIDGenerator, mockUserRepository)

  describe('UUID Generator', () => {
    it('Should call UUIDGenerator once before user registration', async () => {
      const generate = jest.spyOn(mockUUIDGenerator, 'generate')
      const add = jest.spyOn(mockUserRepository, 'add')
      await sut.add(fakeUserParams)
      expect(generate).toHaveBeenCalled()

      // ensure UUID be generated *before* calling user registration method
      const generateCall = generate.mock.invocationCallOrder[0]
      const addCall = add.mock.invocationCallOrder[0]
      expect(generateCall).toBeLessThan(addCall)
    })
  })

  describe('User Repository', () => {
    describe('Find for Existing Email', () => {
      it('Should call verification for existing email with correct email', async () => {
        const exists = jest.spyOn(mockUserRepository, 'exists')
        const add = jest.spyOn(mockUserRepository, 'add')
        await sut.add(fakeUserParams)
        expect(exists).toHaveBeenCalledWith(fakeUserParams.email)

        // ensure email verification is done *before* user registration
        const existsCall = exists.mock.invocationCallOrder[0]
        const addCall = add.mock.invocationCallOrder[0]
        expect(existsCall).toBeLessThan(addCall)
      })

      it('Should return an error if received email is already registered', async () => {
        mockUserRepository.exists.mockResolvedValueOnce(true)
        const error = await sut.add(fakeUserParams)
        expect(error).toEqual(new ExistingEmailError(fakeUserParams.email))
      })
    })

    describe('Add User', () => {
      it('Should call user registration with correct values', async () => {
        const add = jest.spyOn(mockUserRepository, 'add')
        await sut.add(fakeUserParams)
        // ensure UserRepository have been called with above generated UUID
        expect(add).toHaveBeenCalledWith({ ...fakeUserParams, id: mockUUIDGenerator.generate() })
      })

      it('Should not call user registration if its email is already registered', async () => {
        const add = jest.spyOn(mockUserRepository, 'add')
        mockUserRepository.exists.mockResolvedValueOnce(true)
        await sut.add(fakeUserParams)
        expect(add).not.toHaveBeenCalled()
      })

      it('Should return a user data if its registration succeeds', async () => {
        const data = await sut.add(fakeUserParams)
        expect(data).toEqual(fakeUser)
      })

      it('Should pass long the error if UserRepository returns one', async () => {
        mockUserRepository.add.mockRejectedValueOnce(new Error())
        let error = sut.add(fakeUser)
        await expect(error).rejects.toThrow()

        mockUserRepository.exists.mockRejectedValueOnce(new Error())
        error = sut.add(fakeUser)
        await expect(error).rejects.toThrow()
      })
    })
  })
})
