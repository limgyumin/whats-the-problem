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
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Like } from '../like/like.entity';
import { Tag } from '../tag/tag.entity';

@ObjectType()
@Entity('post')
export class Post extends BaseEntity {
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

  @Field(() => String, { nullable: true })
  @Column({
    length: 255,
    nullable: true,
  })
  thumbnail: string;

  @Field(() => Boolean, { defaultValue: false, name: 'isTemp' })
  @Column({
    default: false,
    nullable: false,
  })
  is_temp: boolean;

  @Field(() => Int, { name: 'likeCount' })
  like_count: number;

  @Field(() => Int, { name: 'commentCount' })
  comment_count: number;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'fk_user_idx' })
  user: User;

  @Field(() => Int, { name: 'userIdx' })
  @Column({ nullable: true })
  fk_user_idx: number;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.posts, { onDelete: 'CASCADE' })
  @JoinTable()
  tags: Tag[];

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.post, { onDelete: 'SET NULL' })
  likes: Like[];

  @Field(() => Date, { name: 'createdAt' })
  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date, { name: 'updatedAt' })
  @Column('timestamptz')
  @CreateDateColumn()
  updated_at: Date;
}
