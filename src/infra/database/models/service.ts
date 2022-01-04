import { ServiceData } from '@/modules/services/domain/entities/service'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { AccountModel } from './account'

@Entity({ name: 'services' })
export class ServiceModel implements ServiceData {
  @PrimaryColumn()
  public id: string

  @Column()
  public name: string

  @Column()
  public description?: string

  @Column({ name: 'is_active' })
  public isActive: boolean

  @Column({ name: 'maintainer_account_id' })
  public maintainerAccountId: string

  @JoinColumn({ name: 'maintainer_account_id' })
  @ManyToOne(() => AccountModel)
  account: AccountModel

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date
}
