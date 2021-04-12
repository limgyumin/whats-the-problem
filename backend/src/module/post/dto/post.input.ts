import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  readonly title: string;

  @Field(() => String)
  readonly content: string;

  @Field(() => String, { nullable: true })
  readonly thumbnail: string;

  @Field(() => Boolean, { nullable: true })
  readonly isTemp: boolean;

  @Field(() => [PostTagInput], { nullable: true })
  readonly tags: PostTagInput[];
}

@InputType()
export class UpdatePostInput extends CreatePostInput {}

@InputType()
export class PostTagInput {
  @Field(() => String)
  readonly name: string;
}

@InputType()
export class PostOption {
  @Field(() => Int)
  readonly page: number;

  @Field(() => Int)
  readonly limit: number;
}
