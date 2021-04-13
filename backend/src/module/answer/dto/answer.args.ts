import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@ArgsType()
class BaseAnswerArgs {
  @Field(() => Int)
  @IsNumber()
  readonly idx: number;
}

@ArgsType()
class BaseAnswerInQuestionArgs {
  @Field(() => Int)
  @IsNumber()
  readonly questionIdx: number;
}

@ArgsType()
export class GetAnswersArgs extends BaseAnswerInQuestionArgs {}

@ArgsType()
export class CreateAnswerArgs extends BaseAnswerInQuestionArgs {
  @Field(() => String)
  @IsString()
  readonly content: string;
}

@ArgsType()
export class UpdateAnswerArgs extends BaseAnswerArgs {
  @Field(() => String)
  @IsString()
  readonly content: string;
}

@ArgsType()
export class DeleteAnswerArgs extends BaseAnswerArgs {}
