import { Field, Int, ObjectType } from '@nestjs/graphql';
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

@ObjectType()
@Entity('comment')
export class Comment extends BaseEntity {
  @Field(() => Number)
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

  @Field(() => Int)
  @Column({ nullable: true })
  fk_user_idx: number;

  @Field(() => Post)
  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_post_idx' })
  post: Post;

  @Field(() => Int)
  @Column({ nullable: true })
  fk_post_idx: number;

  @Field(() => Int)
  reply_count: number;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  updated_at: Date;
}
