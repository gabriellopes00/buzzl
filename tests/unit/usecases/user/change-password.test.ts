import { EqualPasswordError } from '@/domain/user/errors/equal-passwords'
import { UnmatchedPasswordError } from '@/domain/user/errors/unmatched-password'
import { DbChangePassword } from '@/usecases/user/change-password'
import { MockHasher } from '@t/mocks/common/hasher'
import { fakeUser } from '@t/mocks/user/user'
import { MockUserRepository } from '@t/mocks/user/user-repository'

describe('ChangeUserPass Usecase', () => {
  const mockUserRepository = new MockUserRepository() as jest.Mocked<MockUserRepository>
  const mockHasher = new MockHasher() as jest.Mocked<MockHasher>
  const sut = new DbChangePassword(mockUserRepository, mockHasher)

  describe('Find for an user', () => {
    it('Should call user repository findOne method with correct id', async () => {
      const findOne = jest.spyOn(mockUserRepository, 'findOne')
      const compare = jest.spyOn(mockHasher, 'compare')
      await sut.change({ userId: fakeUser.id, currentPass: 'pass', newPass: 'pass' })
      expect(findOne).toHaveBeenCalledWith({ id: fakeUser.id })

      const findOneCall = findOne.mock.invocationCallOrder[0]
      const compareCall = compare.mock.invocationCallOrder[0]
      expect(findOneCall).toBeLessThan(compareCall)
    })

    it('Should throw if user repository throws', async () => {
      mockUserRepository.findOne.mockRejectedValueOnce(new Error())
      const error = sut.change({ userId: fakeUser.id, currentPass: 'pass', newPass: '_newpass' })
      await expect(error).rejects.toThrow()
    })
  })

  describe('Hasher', () => {
    describe('Comparer', () => {
      it('Should call hasher once before calls user repository', async () => {
        const compare = jest.spyOn(mockHasher, 'compare')
        const generate = jest.spyOn(mockHasher, 'generate')
        const update = jest.spyOn(mockUserRepository, 'update')
        await sut.change({ userId: fakeUser.id, currentPass: 'pass', newPass: '_newpass' })
        expect(compare).toHaveBeenCalled()

        const compareCall = compare.mock.invocationCallOrder[0]
        const generateCall = generate.mock.invocationCallOrder[0]
        const updateCall = update.mock.invocationCallOrder[0]
        expect(compareCall).toBeLessThan(generateCall)
        expect(generateCall).toBeLessThan(updateCall)
      })

      it('Should return an error if received password is unmatched', async () => {
        mockHasher.compare.mockResolvedValueOnce(false)
        const error = await sut.change({
          userId: fakeUser.id,
          currentPass: 'fake',
          newPass: 'pass'
        })
        expect(error).toBeInstanceOf(UnmatchedPasswordError)
      })

      it('Should return an EqualPasswordError if receive new password equal to the current', async () => {
        const error = await sut.change({
          userId: fakeUser.id,
          currentPass: 'pass',
          newPass: 'pass'
        })
        expect(error).toBeInstanceOf(EqualPasswordError)
      })

      it('Should throw if hash comparer throws', async () => {
        mockHasher.compare.mockRejectedValueOnce(new Error())
        const error = sut.change({ userId: fakeUser.id, currentPass: 'pass', newPass: '_pass' })
        await expect(error).rejects.toThrow()
      })
    })

    describe('Generator', () => {
      it('Should call hash generator with correct value', async () => {
        const generate = jest.spyOn(mockHasher, 'generate')
        await sut.change({ userId: fakeUser.id, currentPass: 'pass', newPass: '_pass' })
        expect(generate).toHaveBeenCalledWith('_pass')
      })

      it('Should throw if hash comparer throws', async () => {
        mockHasher.generate.mockRejectedValueOnce(new Error())
        const error = sut.change({ userId: fakeUser.id, currentPass: 'pass', newPass: '_pass' })
        await expect(error).rejects.toThrow()
      })
    })
  })
})
