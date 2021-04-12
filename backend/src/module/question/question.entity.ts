import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from '../answer/answer.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

@ObjectType()
@Entity('question')
export class Question extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  idx: number;

  @Field(() => String)
  @Column({
    length: 255,
    nullable: false,
  })
  title: string;

  @Field(() => String)
  @Column('text', {
    nullable: false,
  })
  content: string;

  @Field(() => Boolean, {
    name: 'isTemp',
    defaultValue: false,
  })
  @Column({ nullable: false, default: false })
  is_temp: boolean;

  @Field(() => User)
  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'fk_user_idx' })
  user: User;

  @Field(() => Int, { name: 'userIdx' })
  @Column({ nullable: true })
  fk_user_idx: number;

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.question, {
    onDelete: 'SET NULL',
  })
  answers: Answer[];

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.questions, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  tags: Tag[];

  @Field(() => Date, { name: 'createdAt' })
  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date, { name: 'updatedAt' })
  @Column('timestamptz')
  @CreateDateColumn()
  updated_at: Date;
}
