import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Question } from '../question/question.entity';

@ObjectType()
@Entity('tag')
export class Tag extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  idx!: number;

  @Field(() => String)
  @Column({
    length: 100,
    nullable: false,
    unique: true,
  })
  name!: string;

  @Field(() => [Post])
  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];

  @Field(() => [Question])
  @ManyToMany(() => Question, (question) => question.tags)
  questions: Question[];

  @Field(() => Int, { name: 'postCount' })
  post_count: number;
}
