import { Service } from '@/domain/service/service'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { UserModel } from './account'

@Entity('service')
export class ServiceModel implements Service {
  @PrimaryColumn()
  public id: string

  @Column()
  public name: string

  @Column()
  public description: string

  @JoinColumn({ name: 'maintainer' })
  @ManyToOne(() => UserModel)
  user: UserModel

  @Column()
  public maintainer: string

  @Column()
  public isActive: boolean

  @Column({ unique: true })
  public apiKey: string

  @CreateDateColumn()
  public created_at: Date

  @UpdateDateColumn()
  public updated_at: Date
}
