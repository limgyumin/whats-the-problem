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
  @JoinColumn({ name: 'userIdx' })
  user: User;

  @Field(() => Int)
  @Column({ nullable: true })
  userIdx: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postIdx' })
  post: Post;

  @Field(() => Int)
  @Column({ nullable: true })
  postIdx: number;
}
