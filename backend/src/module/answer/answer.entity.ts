import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../question/question.entity';
import { User } from '../user/user.entity';

@ObjectType()
@Entity('answer')
export class Answer extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  idx: number;

  @Field(() => String)
  @Column('text', {
    nullable: false,
  })
  content: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userIdx' })
  user: User;

  @Field(() => Int)
  @Column({ nullable: true })
  userIdx: number;

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionIdx' })
  question: Question;

  @Field(() => Int)
  @Column({ nullable: true })
  questionIdx: number;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  updatedAt: Date;
}
