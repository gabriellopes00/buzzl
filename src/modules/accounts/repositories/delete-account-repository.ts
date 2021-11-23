export interface DeleteAccountRepository {
  delete(accountId: string): Promise<void>
}
