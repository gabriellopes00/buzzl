export interface LoadGoogleAccountRepository {
  existsEmail(email: string): Promise<boolean>
}
