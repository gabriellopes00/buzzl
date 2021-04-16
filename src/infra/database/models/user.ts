import { User } from '@/domain/entities/user'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { tableNames } from '../helpers/psql-helper'

@Entity(tableNames.user)
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
