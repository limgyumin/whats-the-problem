import { Field, ObjectType } from '@nestjs/graphql';
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

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;
}
