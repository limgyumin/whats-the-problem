import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  readonly id: string;

  @Field(() => String)
  readonly password: string;
}

@InputType()
export class QueryValue {
  @Field(() => Number)
  readonly page: number;

  @Field(() => Number)
  readonly limit: number;
}
