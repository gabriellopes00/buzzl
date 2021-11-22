import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'accounts' })
export class AccountModel {
  @PrimaryColumn()
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  public password: string

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date
}
