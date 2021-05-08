import { ServiceParams } from '@/domain/usecases/service/add-service'
import { AuthMaintainer } from '@/domain/usecases/service/auth-maintainer'
import { UserRepository } from '@/usecases/ports/user-repository'
import { HttpResponse } from '../ports/http'
import { Middleware } from '../ports/middleware'

export interface UserAuthenticationRequest {
  accessToken?: string
  data: ServiceParams
}

export class UserAuthentication implements Middleware {
  constructor(
    private readonly authenticator: AuthMaintainer,
    private readonly userRepository: UserRepository
  ) {}

  public async handle(request: any): Promise<HttpResponse> {
    return null
  }
}
