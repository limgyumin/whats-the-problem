import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@ArgsType()
class BaseReplyArgs {
  @Field(() => Int)
  @IsNumber()
  readonly idx: number;
}

@ArgsType()
class BaseReplyInCommentArgs {
  @Field(() => Int)
  @IsNumber()
  readonly commentIdx: number;
}

@ArgsType()
export class GetRepliesArgs extends BaseReplyInCommentArgs {}

@ArgsType()
export class CreateReplyArgs extends BaseReplyInCommentArgs {
  @Field(() => String)
  @IsString()
  readonly content: string;
}

@ArgsType()
export class UpdateReplyArgs extends BaseReplyArgs {
  @Field(() => Int)
  @IsNumber()
  readonly idx: number;

  @Field(() => String)
  @IsString()
  readonly content: string;
}

@ArgsType()
export class DeleteReplyArgs extends BaseReplyArgs {}
