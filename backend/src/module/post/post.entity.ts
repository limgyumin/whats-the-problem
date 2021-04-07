import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/module/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';

@ObjectType()
@Entity('post')
export class Post extends BaseEntity {
  @Field(() => Number)
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

  @Field(() => String, { nullable: true })
  @Column({
    length: 255,
    nullable: true,
  })
  thumbnail: string;

  @Field(() => Boolean, { defaultValue: false })
  @Column({
    default: false,
    nullable: false,
  })
  is_temp: boolean;

  @Field(() => Int)
  like_count: number;

  @Field(() => Int)
  comment_count: number;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'fk_user_idx' })
  user: User;

  @Field(() => Int)
  @Column({ nullable: true })
  fk_user_idx: number;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.posts, { onDelete: 'CASCADE' })
  @JoinTable()
  tags: Tag[];

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  updated_at: Date;
}
