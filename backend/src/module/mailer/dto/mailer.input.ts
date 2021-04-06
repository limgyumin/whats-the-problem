import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class MailerQueryValue {
  @Field(() => Int)
  readonly page: number;

  @Field(() => Int)
  readonly limit: number;
}
