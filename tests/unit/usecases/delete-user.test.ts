import { UnauthorizedUserDeletionError } from '@/domain/user/errors/unauthorized-deletion'
import { UnregisteredEmailError } from '@/domain/user/errors/unregistered-email'
import { DbDeleteUser } from '@/usecases/user/delete-user'
import { fakeUser, fakeUserParams } from '../../mocks/user'
import { MockUserRepository } from '../../mocks/user-repository'

describe('Delete Service Usecase', () => {
  const mockUserRepository = new MockUserRepository() as jest.Mocked<MockUserRepository>
  const sut = new DbDeleteUser(mockUserRepository)

  describe('User Repository', () => {
    describe('Find User', () => {
      it('Should find for a user with received email before delete one', async () => {
        const findOne = jest.spyOn(mockUserRepository, 'findOne')
        const del = jest.spyOn(mockUserRepository, 'delete')
        await sut.delete(fakeUser.email, fakeUser.id)
        expect(findOne).toHaveBeenCalledWith({ email: fakeUserParams.email })

        // ensure user be found *before* it's deletion
        const findOneCall = findOne.mock.invocationCallOrder[0]
        const delCall = del.mock.invocationCallOrder[0]
        expect(findOneCall).toBeLessThan(delCall)
      })

      it('Should return an error if received an unregistered email', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce(null)
        const error = await sut.delete(fakeUser.email, fakeUser.id)
        expect(error).toBeInstanceOf(UnregisteredEmailError)
      })

      it('Should return an error if received deletion request from an unauthorized user', async () => {
        const error = await sut.delete(fakeUser.email, 'invalid_id')
        expect(error).toBeInstanceOf(UnauthorizedUserDeletionError)
      })

      it('Should throws if user repository throws', async () => {
        mockUserRepository.findOne.mockRejectedValueOnce(new Error())
        const error = sut.delete(fakeUser.email, fakeUser.id)
        await expect(error).rejects.toThrow()
      })
    })

    describe('Delete User', () => {
      it('Should not call user deletion if receive an unregistered', async () => {
        const del = jest.spyOn(mockUserRepository, 'delete')
        mockUserRepository.findOne.mockResolvedValueOnce(null)
        await sut.delete(fakeUser.email, fakeUser.id)
        expect(del).not.toHaveBeenCalled()
      })

      it('Should not call user deletion if received id is not the same of the correspondent email', async () => {
        const del = jest.spyOn(mockUserRepository, 'delete')
        mockUserRepository.findOne.mockResolvedValueOnce(null)
        await sut.delete(fakeUser.email, fakeUser.id)
        expect(del).not.toHaveBeenCalled()
      })

      it('Should call user deletion with correct values', async () => {
        const del = jest.spyOn(mockUserRepository, 'delete')
        await sut.delete(fakeUser.email, fakeUser.id)
        expect(del).toHaveBeenCalledWith({ email: fakeUser.email })
      })

      it('Should throws if user repository throws', async () => {
        mockUserRepository.delete.mockRejectedValueOnce(new Error())
        const error = sut.delete(fakeUser.email, fakeUser.id)
        await expect(error).rejects.toThrow()
      })
    })
  })
})
