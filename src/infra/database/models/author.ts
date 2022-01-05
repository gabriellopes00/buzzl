import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm'
import { FeedbackModel } from './feedback'

@Entity('authors')
export class AuthorModel {
  @PrimaryColumn()
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @OneToMany(() => FeedbackModel, feedback => feedback.author)
  @JoinColumn({ name: 'author_id' })
  feedbacks: FeedbackModel[]

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date
}
