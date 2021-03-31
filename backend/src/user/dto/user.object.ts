import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GitHubUser {
  @Field(() => String)
  readonly avatar_url: string;

  @Field(() => String, { nullable: true })
  readonly email: string;

  @Field(() => String)
  readonly login: string;

  @Field(() => String, { nullable: true })
  readonly name: string;

  @Field(() => String)
  readonly bio: string;
}
