import { User } from '@/domain/entities/user'
import { Column, Entity } from 'typeorm'

@Entity()
export class UserModel implements User {
  @Column()
  readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string
}
