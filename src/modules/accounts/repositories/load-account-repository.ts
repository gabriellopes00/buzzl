export interface LoadAccountRepository {
  existsEmail(email: string): Promise<boolean>
}
