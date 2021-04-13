import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { UpdatePostInput } from './post.input';

@ArgsType()
class BasePostArgs {
  @Field(() => Int)
  @IsNumber()
  readonly idx: number;
}

@ArgsType()
export class GetPostArgs extends BasePostArgs {}

@ArgsType()
export class UpdatePostArgs extends BasePostArgs {
  @Field(() => UpdatePostInput)
  @ValidateNested()
  @Type(() => UpdatePostInput)
  readonly post: UpdatePostInput;
}

@ArgsType()
export class DeletePostArgs extends BasePostArgs {}
