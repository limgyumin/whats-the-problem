import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class TagOption {
  @Field(() => Int)
  @IsNumber()
  readonly page: number;

  @Field(() => Int)
  @IsNumber()
  readonly limit: number;
}
