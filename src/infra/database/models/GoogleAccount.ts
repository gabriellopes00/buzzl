import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'google_accounts' })
export class GoogleAccountModel {
  @PrimaryColumn()
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column({ name: 'google_id' })
  public googleId: string

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date
}
