import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('mailer')
export class Mailer extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  idx: number;

  @Field(() => String)
  @Column({
    length: 5,
    nullable: false,
  })
  verify_code: string;

  @Field(() => String)
  @Column({
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Field(() => Date)
  @Column('datetime')
  @CreateDateColumn()
  expired_at: Date;

  @Field(() => Boolean, { defaultValue: false })
  @Column({
    default: false,
    nullable: false,
  })
  is_verified: boolean;
}
