import { AuthMaintainer } from '@/domain/usecases/service/auth-maintainer'

export class MaintainerAuthentication implements AuthMaintainer {
  public async auth(token: string): Promise<boolean> {
    return null
  }
}
