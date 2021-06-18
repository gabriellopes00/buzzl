import { Evaluation } from '@/domain/evaluation/evaluation'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { ServiceModel } from './service'

@Entity('evaluation')
export class EvaluationModel implements Evaluation {
  @PrimaryColumn()
  public id: string

  @Column({ type: 'int' })
  public rating: number

  @JoinColumn({ name: 'service' })
  @ManyToOne(() => ServiceModel)
  serviceData: ServiceModel

  @Column()
  public service: string

  @CreateDateColumn()
  public created_at: Date

  @UpdateDateColumn()
  public updated_at: Date
}
