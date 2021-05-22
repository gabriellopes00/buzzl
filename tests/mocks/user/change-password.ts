import { ChangePassParams, ChangePassword } from '@/domain/user/change-password'
import { EqualPasswordError } from '@/domain/user/errors/equal-passwords'
import { ExistingEmailError } from '@/domain/user/errors/existing-email'

export class MockChangePass implements ChangePassword {
  async change(data: ChangePassParams): Promise<void | ExistingEmailError | EqualPasswordError> {}
}
