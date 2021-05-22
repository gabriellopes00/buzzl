import { ChangePassParams, ChangePassword } from '@/domain/user/change-password'
import { EqualPasswordError } from '@/domain/user/errors/equal-passwords'
import { UnmatchedPasswordError } from '@/domain/user/errors/unmatched-password'
import { User } from '@/domain/user/user'
import { Hasher } from '../ports/hasher'
import { UserRepository } from '../ports/user-repository'

export class DbChangePassword implements ChangePassword {
  constructor(private readonly userRepository: UserRepository, private readonly hasher: Hasher) {}

  public async change(data: ChangePassParams): Promise<User | UnmatchedPasswordError> {
    const { currentPass, userId, newPass } = data

    const user = await this.userRepository.findOne({ id: userId })
    const matchedPass = await this.hasher.compare(currentPass, user.password)
    if (!matchedPass) return new UnmatchedPasswordError(user.email)
    else if (currentPass === newPass) return new EqualPasswordError()

    const newPassHash = await this.hasher.generate(newPass)
    return await this.userRepository.update({ ...user, password: newPassHash })
  }
}
