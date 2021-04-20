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

  @Field(() => String)
  @Column({
    length: 5,
    nullable: false,
  })
  verifyCode: string;

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
  expiredAt: Date;

  @Field(() => Boolean, { defaultValue: false })
  @Column({
    default: false,
    nullable: false,
  })
  isVerified: boolean;
}
