import {
  DeleteAccountController,
  DeleteAccountControllerParams
} from '@/modules/accounts/controllers/delete-account-controller'
import { ForbiddenError } from '@/presentation/errors/forbidden'
import {
  badRequest,
  forbidden,
  noContent,
  notFound,
  serverError
} from '@/presentation/helpers/http'
import { left, right } from '@/shared/either'
import { MockedValidator } from '@t/mocks/infra/validator'
import { InMemoryAccountsRepository } from '@t/mocks/infra/repositories/in-memory-account-repository'
import { DeleteAccount } from '@/modules/accounts/usecases/delete-account'
import { IdNotFoundError } from '@/modules/accounts/usecases/errors/id-not-found'

describe('Delete Account Controller', () => {
  const mockedValidator = new MockedValidator()
  const inMemoryRepository = new InMemoryAccountsRepository()
  const deleteAccount = new DeleteAccount(inMemoryRepository)
  const sut = new DeleteAccountController(mockedValidator, deleteAccount)

  const DeleteAccountParams: DeleteAccountControllerParams = {
    id: '55bc05b5-118c-4fa9-8b92-163348ea85ce',
    accountId: '55bc05b5-118c-4fa9-8b92-163348ea85ce'
  }

  beforeEach(() => inMemoryRepository.truncate())

  describe('Validation', () => {
    it('Should call validator with correct values', async () => {
      const validator = jest.spyOn(mockedValidator, 'validate')
      await sut.handle(DeleteAccountParams)

      expect(validator).toHaveBeenCalledWith(DeleteAccountParams)
    })

    it('Should return 400 response if validation fails', async () => {
      jest.spyOn(mockedValidator, 'validate').mockReturnValueOnce(new Error())
      const response = await sut.handle(DeleteAccountParams)
      expect(response).toEqual(badRequest(new Error()))
    })
  })

  describe('Delete Account Usecase', () => {
    it('Should not call DeleteAccount usecase if validation fails', async () => {
      const del = jest.spyOn(deleteAccount, 'delete')
      jest.spyOn(mockedValidator, 'validate').mockReturnValueOnce(new Error())
      await sut.handle(DeleteAccountParams)
      expect(del).not.toHaveBeenCalled()
    })

    it('Should return a 404 response if received id is not assigned to any account', async () => {
      jest
        .spyOn(deleteAccount, 'delete')
        .mockResolvedValueOnce(left(new IdNotFoundError('55bc05b5-118c-4fa9-8b92-163348ea85ce')))
      const response = await sut.handle(DeleteAccountParams)
      expect(response).toEqual(
        notFound(new IdNotFoundError('55bc05b5-118c-4fa9-8b92-163348ea85ce'))
      )
    })

    it('Should return a 403 response account deletion is forbidden', async () => {
      const response = await sut.handle({ ...DeleteAccountParams, accountId: 'different_uuid' })
      expect(response).toEqual(forbidden(new ForbiddenError('Forbidden account deletion')))
    })

    it('Should return a 204 on success', async () => {
      jest.spyOn(deleteAccount, 'delete').mockResolvedValueOnce(right(null)) // success case
      const response = await sut.handle(DeleteAccountParams)
      expect(response).toEqual(noContent())
    })
  })

  it('Should return a 500 response if something throws', async () => {
    jest.spyOn(deleteAccount, 'delete').mockRejectedValueOnce(new Error('some error'))
    const response = await sut.handle(DeleteAccountParams)
    expect(response).toEqual(serverError(new Error('some error')))
  })
})
