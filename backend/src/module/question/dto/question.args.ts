import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { QuestionType } from 'src/enum/question.enum';
import { QuestionOption, UpdateQuestionInput } from './question.input';

@ArgsType()
class BaseQuestionArgs {
  @Field(() => String)
  @IsString()
  readonly uuid: string;
}

@ArgsType()
export class GetQuestionArgs {
  @Field(() => String)
  @IsString()
  readonly url: string;
}

@ArgsType()
export class GetQuestionsArgs {
  @Field(() => QuestionType)
  @IsEnum(QuestionType)
  readonly questionType: QuestionType;

  @Field(() => QuestionOption)
  @Type(() => QuestionOption)
  @ValidateNested()
  readonly option: QuestionOption;
}

@ArgsType()
export class UpdateQuestionArgs extends BaseQuestionArgs {
  @Field(() => UpdateQuestionInput)
  @ValidateNested()
  @Type(() => UpdateQuestionInput)
  readonly question: UpdateQuestionInput;
}

@ArgsType()
export class DeleteQuestionArgs extends BaseQuestionArgs {}
