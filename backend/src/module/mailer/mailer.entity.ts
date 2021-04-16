import { Field, Int, ObjectType } from '@nestjs/graphql';
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
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  idx: number;

  @Field(() => String, { name: 'verifyCode' })
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

  @Field(() => Date, { name: 'expiredAt' })
  @Column('datetime')
  @CreateDateColumn()
  expired_at: Date;

  @Field(() => Boolean, { defaultValue: false, name: 'isVerified' })
  @Column({
    default: false,
    nullable: false,
  })
  is_verified: boolean;
}
