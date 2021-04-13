import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, ValidateNested } from 'class-validator';
import { PostType } from 'src/enum/post.enum';
import { PostOption, UpdatePostInput } from './post.input';

@ArgsType()
class BasePostArgs {
  @Field(() => Int)
  @IsNumber()
  readonly idx: number;
}

@ArgsType()
export class GetPostArgs extends BasePostArgs {}

@ArgsType()
export class GetPostsArgs {
  @Field(() => PostType)
  @IsEnum(PostType)
  readonly postType: PostType;

  @Field(() => PostOption)
  @Type(() => PostOption)
  @ValidateNested()
  readonly option: PostOption;
}

@ArgsType()
export class UpdatePostArgs extends BasePostArgs {
  @Field(() => UpdatePostInput)
  @ValidateNested()
  @Type(() => UpdatePostInput)
  readonly post: UpdatePostInput;
}

@ArgsType()
export class DeletePostArgs extends BasePostArgs {}
