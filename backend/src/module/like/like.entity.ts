import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@ObjectType()
@Entity('like')
export class Like extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  idx: number;

  @Field(() => Boolean, {
    defaultValue: false,
  })
  liked: boolean;

  @Field(() => User)
  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'fk_user_idx' })
  user: User;

  @Field(() => Int, {
    name: 'userIdx',
  })
  @Column({ nullable: true })
  fk_user_idx: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_post_idx' })
  post: Post;

  @Field(() => Int, { name: 'postIdx' })
  @Column({ nullable: true })
  fk_post_idx: number;
}
