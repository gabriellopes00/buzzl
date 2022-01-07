import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm'
import { FeedbackModel } from './feedback'

@Entity('authors')
export class AuthorModel {
  @Column()
  public name: string

  @PrimaryColumn()
  public email: string

  @OneToMany(() => FeedbackModel, feedback => feedback.author)
  @JoinColumn({ name: 'author_email' })
  feedbacks: FeedbackModel[]

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date
}
