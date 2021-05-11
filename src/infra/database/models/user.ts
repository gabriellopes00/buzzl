import { User } from '@/domain/user/user'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('user')
export class UserModel implements User {
  @PrimaryColumn()
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  public password: string

  @CreateDateColumn()
  public created_at: Date
}
