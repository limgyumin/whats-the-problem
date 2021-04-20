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
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  idx: number;

  @Field(() => String, { nullable: true })
  @Column({
    length: 255,
    nullable: true,
  })
  avatar: string;

  @Field(() => String, { nullable: true })
  @Column({
    length: 10,
    nullable: true,
    unique: true,
  })
  gitHubId: string;

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
    length: 50,
    nullable: false,
  })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({
    length: 255,
    nullable: true,
  })
  bio: string;

  @Field(() => Int)
  @Column({
    default: 0,
  })
  score: number;

  @Field(() => Boolean, { defaultValue: false })
  isNew: boolean;

  @Field(() => Boolean)
  @Column({
    default: false,
  })
  isAdmin: boolean;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  createdAt: Date;
}
