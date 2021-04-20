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
  @JoinColumn({ name: 'userIdx' })
  user: User;

  @Field(() => Int)
  @Column({ nullable: true })
  userIdx: number;

  @Field(() => Post)
  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postIdx' })
  post: Post;

  @Field(() => Int)
  @Column({ nullable: true })
  postIdx: number;

  @Field(() => Answer)
  @ManyToOne(() => Answer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'answerIdx' })
  answer: Answer;

  @Field(() => Int)
  @Column({ nullable: true })
  answerIdx: number;

  @Field(() => CommentType)
  @Column({ type: 'enum', enum: CommentType })
  commentType: CommentType;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  updatedAt: Date;
}
