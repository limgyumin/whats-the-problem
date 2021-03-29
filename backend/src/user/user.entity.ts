import { Field, ID, ObjectType } from '@nestjs/graphql';
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
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  idx: number;

  @Field(() => String)
  @Column({
    length: 255,
    nullable: false,
  })
  name: string;

  @Field(() => String)
  @Column({
    length: 255,
    nullable: false,
    unique: true,
  })
  id: string;

  @Field(() => String)
  @Column({
    length: 255,
    nullable: false,
  })
  password: string;

  @Field(() => String, { nullable: true })
  @Column({
    length: 255,
    nullable: true,
  })
  bio: string;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;
}
