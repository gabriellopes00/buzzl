import { FeedbackCategory } from '@/modules/feedbacks/domain/entities/feedback'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { ServiceModel } from './service'

@Entity({ name: 'feedbacks' })
export class FeedbackModel {
  @PrimaryColumn()
  public id: string

  @Column()
  public title: string

  @Column()
  public content: string

  @Column({ enum: ['COMMENT', 'ISSUE', 'IDEA', 'OTHER'] })
  public category: FeedbackCategory

  @Column({ name: 'is_private' })
  public isPrivate: boolean

  @Column({ name: 'author' })
  public serviceId: string

  @Column({ name: 'author_name' })
  public authorName: string

  @Column({ name: 'author_email' })
  public authorEmail: string

  @JoinColumn({ name: 'service_id' })
  @ManyToOne(() => ServiceModel)
  service: ServiceModel

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date
}
