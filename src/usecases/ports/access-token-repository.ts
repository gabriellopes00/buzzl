export interface AccessTokenRepository {
  add(token: string, userEmail: string): Promise<string>
}
