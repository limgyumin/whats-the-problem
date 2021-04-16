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
  @JoinColumn({ name: 'fk_user_idx' })
  user: User;

  @Field(() => Int, { name: 'userIdx' })
  @Column({ nullable: true })
  fk_user_idx: number;

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_question_idx' })
  question: Question;

  @Field(() => Int, { name: 'questionIdx' })
  @Column({ nullable: true })
  fk_question_idx: number;

  @Field(() => Date, { name: 'createdAt' })
  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date, { name: 'updatedAt' })
  @Column('timestamptz')
  @CreateDateColumn()
  updated_at: Date;
}