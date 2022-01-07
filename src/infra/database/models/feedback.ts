import { FeedbackCategory } from '@/modules/feedbacks/domain/entities/feedback'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { AuthorModel } from './author'
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

  @Column({ name: 'service_id' })
  public serviceId: string

  @JoinColumn({ name: 'service_id' })
  @ManyToOne(() => ServiceModel)
  service: ServiceModel

  @ManyToOne(() => AuthorModel, { cascade: ['insert', 'update'] })
  @JoinColumn({ name: 'author_email' })
  author: AuthorModel

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date
}
