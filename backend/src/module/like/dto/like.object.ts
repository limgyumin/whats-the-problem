import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Like } from '../like.entity';

@ObjectType()
export class LikeObject {
  @Field(() => Int)
  likeCount: number;

  @Field(() => [Like])
  list: Like[];
}
