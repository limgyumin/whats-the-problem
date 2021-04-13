import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CommentType } from 'src/enum/comment.enum';

@ArgsType()
class BaseCommentInParentArgs {
  @Field(() => Int)
  @IsNumber()
  readonly parentIdx: number;

  @Field(() => CommentType)
  @IsEnum(CommentType)
  readonly commentType: CommentType;
}

@ArgsType()
class BaseCommentArgs {
  @Field(() => Int)
  @IsNumber()
  readonly idx: number;
}

@ArgsType()
export class GetCommentsArgs extends BaseCommentInParentArgs {}

@ArgsType()
export class CreateCommentArgs extends BaseCommentInParentArgs {
  @Field(() => String)
  @IsString()
  readonly content: string;
}

@ArgsType()
export class UpdateCommentArgs extends BaseCommentArgs {
  @Field(() => String)
  @IsString()
  readonly content: string;
}

@ArgsType()
export class DeleteCommentArgs extends BaseCommentArgs {}
