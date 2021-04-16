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
  @JoinColumn({ name: 'fk_user_idx' })
  user: User;

  @Field(() => Int, { name: 'userIdx' })
  @Column({ nullable: true })
  fk_user_idx: number;

  @Field(() => Comment)
  @ManyToOne(() => Comment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_comment_idx' })
  comment: Comment;

  @Field(() => Int, { name: 'commentIdx' })
  @Column({ nullable: true })
  fk_comment_idx: number;

  @Field(() => Date, { name: 'createdAt' })
  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date, { name: 'updatedAt' })
  @Column('timestamptz')
  @CreateDateColumn()
  updated_at: Date;
}
