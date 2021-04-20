import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';

@ObjectType()
@Entity('reply')
export class Reply extends BaseEntity {
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

  @Field(() => Comment)
  @ManyToOne(() => Comment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'commentIdx' })
  comment: Comment;

  @Field(() => Int)
  @Column({ nullable: true })
  commentIdx: number;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  updatedAt: Date;
}
