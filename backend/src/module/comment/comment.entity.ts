import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CommentType } from 'src/enum/comment.enum';
import { Post } from 'src/module/post/post.entity';
import { User } from 'src/module/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from '../answer/answer.entity';

@ObjectType()
@Entity('comment')
export class Comment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  idx: number;

  @Field(() => String)
  @Column('text', {
    nullable: false,
  })
  content: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_user_idx' })
  user: User;

  @Field(() => Int, { name: 'userIdx' })
  @Column({ nullable: true })
  fk_user_idx: number;

  @Field(() => Post)
  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_post_idx' })
  post: Post;

  @Field(() => Int, { name: 'postIdx' })
  @Column({ nullable: true })
  fk_post_idx: number;

  @Field(() => Answer)
  @ManyToOne(() => Answer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_answer_idx' })
  answer: Answer;

  @Field(() => Int, { name: 'answerIdx' })
  @Column({ nullable: true })
  fk_answer_idx: number;

  @Field(() => CommentType, { name: 'commentType' })
  @Column({ type: 'enum', enum: CommentType })
  comment_type: CommentType;

  @Field(() => Int, { name: 'replyCount' })
  reply_count: number;

  @Field(() => Date, { name: 'createdAt' })
  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date, { name: 'updatedAt' })
  @Column('timestamptz')
  @CreateDateColumn()
  updated_at: Date;
}
