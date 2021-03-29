import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  readonly name: string;

  @Field(() => String)
  readonly id: string;

  @Field(() => String)
  readonly password: string;

  @Field(() => String)
  readonly bio: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, {
    nullable: true,
  })
  readonly name?: string;

  @Field(() => String, {
    nullable: true,
  })
  readonly password?: string;

  @Field(() => String, {
    nullable: true,
  })
  readonly bio?: string;
}

@InputType()
export class QueryValue {
  @Field(() => Number)
  readonly page: number;

  @Field(() => Number)
  readonly limit: number;
}
