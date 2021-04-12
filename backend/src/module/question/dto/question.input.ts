import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field(() => String)
  readonly title: string;

  @Field(() => String)
  readonly content: string;

  @Field(() => Boolean, { nullable: true })
  readonly isTemp: boolean;

  @Field(() => [QuestionTagInput], { nullable: true })
  readonly tags: QuestionTagInput[];
}

@InputType()
export class UpdateQuestionInput extends CreateQuestionInput {}

@InputType()
export class QuestionTagInput {
  @Field(() => String)
  readonly name: string;
}

@InputType()
export class QuestionOption {
  @Field(() => Int)
  readonly page: number;

  @Field(() => Int)
  readonly limit: number;
}
