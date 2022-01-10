import { GoogleAccount } from '../domain/entities/google-account'

export interface SaveGoogleAccountRepository {
  save(data: GoogleAccount): Promise<void>
}
