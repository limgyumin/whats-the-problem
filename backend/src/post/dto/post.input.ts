import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  readonly title: string;

  @Field(() => String)
  readonly description: string;

  @Field(() => String)
  readonly content: string;

  @Field(() => String)
  readonly thumbnail: string;
}

@InputType()
export class UpdatePostInput {
  @Field(() => String, { nullable: true })
  readonly title: string;

  @Field(() => String, { nullable: true })
  readonly description: string;

  @Field(() => String, { nullable: true })
  readonly content: string;

  @Field(() => String, { nullable: true })
  readonly thumbnail: string;
}

@InputType()
export class QueryValue {
  @Field(() => Int)
  readonly page: number;

  @Field(() => Int)
  readonly limit: number;
}
