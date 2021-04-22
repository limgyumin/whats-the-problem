import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from '../question.entity';

@ObjectType()
export class QuestionObject {
  @Field(() => Int)
  questionCount: number;
}
