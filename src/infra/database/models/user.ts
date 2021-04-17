import { User } from '@/domain/entities/user'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { tableNames } from '../helpers/psql-helper'

@Entity(tableNames.user)
export class UserModel implements User {
  @PrimaryColumn()
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  public password: string
}
