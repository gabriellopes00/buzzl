import { User } from '@/domain/entities/user'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class UserModel implements User {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string
}
