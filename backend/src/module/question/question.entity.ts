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
    defaultValue: false,
  })
  @Column({ nullable: false, default: false })
  isTemp: boolean;

  @Field(() => User)
  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userIdx' })
  user: User;

  @Field(() => Int)
  @Column({ nullable: true })
  userIdx: number;

  @Field(() => String)
  @Column('text', {
    nullable: false,
    unique: true,
  })
  url: string;

  @Field(() => String)
  @Column('text', {
    nullable: false,
    unique: true,
  })
  uuid: string;

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

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  updatedAt: Date;
}
