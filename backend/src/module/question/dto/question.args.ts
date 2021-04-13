import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { UpdateQuestionInput } from './question.input';

@ArgsType()
class BaseQuestionArgs {
  @Field(() => Int)
  @IsNumber()
  readonly idx: number;
}

@ArgsType()
export class GetQuestionArgs extends BaseQuestionArgs {}

@ArgsType()
export class UpdateQuestionArgs extends BaseQuestionArgs {
  @Field(() => UpdateQuestionInput)
  @ValidateNested()
  @Type(() => UpdateQuestionInput)
  readonly question: UpdateQuestionInput;
}

@ArgsType()
export class DeleteQuestionArgs extends BaseQuestionArgs {}
