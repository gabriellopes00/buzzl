import { Service } from '@/domain/entities/service'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { UserModel } from './user'

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

  @PrimaryColumn()
  public apiKey: string

  @CreateDateColumn()
  public created_at: Date
}
