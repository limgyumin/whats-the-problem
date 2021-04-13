import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('user')
export class User extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  idx: number;

  @Field(() => String, { nullable: true })
  @Column({
    length: 255,
    nullable: true,
  })
  avatar: string;

  @Field(() => String, { nullable: true, name: 'gitHubId' })
  @Column({
    length: 10,
    nullable: true,
    unique: true,
  })
  github_id: string;

  @Field(() => String, { nullable: true })
  @Column({
    length: 255,
    nullable: true,
    unique: true,
  })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({
    length: 100,
    nullable: true,
  })
  password: string;

  @Field(() => String)
  @Column({
    length: 255,
    nullable: false,
  })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({
    length: 255,
    nullable: true,
  })
  bio: string;

  @Field(() => Int, { defaultValue: 0 })
  @Column({
    default: 0,
  })
  score: number;

  @Field(() => Boolean, { defaultValue: false, name: 'isAdmin' })
  @Column({
    default: false,
  })
  is_admin: boolean;

  @Field(() => Date, { name: 'createdAt' })
  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;
}
