export interface AccessTokenRepositoryParams {
  token: string
  userEmail: string
}

export interface AccessTokenRepository {
  add(data: AccessTokenRepositoryParams): Promise<string>
}
