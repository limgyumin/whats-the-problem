import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field(() => String)
  @IsString()
  @MaxLength(255)
  readonly title: string;

  @Field(() => String)
  @IsString()
  readonly content: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  readonly isTemp: boolean;

  @Field(() => [QuestionTagInput], { nullable: true })
  @IsOptional()
  @IsArray()
  readonly tags: QuestionTagInput[];
}

@InputType()
export class UpdateQuestionInput extends CreateQuestionInput {}

@InputType()
export class QuestionTagInput {
  @Field(() => String)
  @IsString()
  @MaxLength(100)
  readonly name: string;
}

@InputType()
export class QuestionOption {
  @Field(() => Int)
  readonly page: number;

  @Field(() => Int)
  readonly limit: number;
}
