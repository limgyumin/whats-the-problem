import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  readonly title: string;

  @Field(() => String)
  readonly content: string;

  @Field(() => String, { nullable: true })
  readonly thumbnail: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  readonly isTemp: boolean;
}

@InputType()
export class UpdatePostInput {
  @Field(() => String, { nullable: true })
  readonly title: string;

  @Field(() => String, { nullable: true })
  readonly content: string;

  @Field(() => String, { nullable: true })
  readonly thumbnail: string;

  @Field(() => Boolean, { nullable: true })
  readonly isTemp: boolean;
}

@InputType()
export class PostQueryValue {
  @Field(() => Int)
  readonly page: number;

  @Field(() => Int)
  readonly limit: number;
}
