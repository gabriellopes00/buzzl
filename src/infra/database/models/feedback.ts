import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { Feedback } from '../../../domain/feedback/feedback'
import { ServiceModel } from './service'

@Entity('service')
export class FeedbackModel implements Feedback {
  @PrimaryColumn()
  public id: string

  @Column({ enum: ['COMMENT', 'ISSUE', 'IDEA', 'OTHER'] })
  public category: 'COMMENT' | 'ISSUE' | 'IDEA' | 'OTHER'

  @Column()
  public content: string

  @JoinColumn({ name: 'service' })
  @ManyToOne(() => ServiceModel)
  serviceData: ServiceModel

  @Column()
  public service: string

  @Column({ nullable: true })
  public customerEmail: string

  @CreateDateColumn()
  public created_at: Date

  @UpdateDateColumn()
  public updated_at: Date
}
