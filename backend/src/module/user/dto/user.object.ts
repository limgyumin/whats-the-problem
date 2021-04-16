import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength } from 'class-validator';

@ObjectType()
export class GitHubUser {
  @Field(() => String)
  @IsString()
  @MaxLength(255)
  readonly avatar: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @MaxLength(255)
  readonly email: string;

  @Field(() => String)
  @IsString()
  readonly gitHubId: string;

  @Field(() => String)
  @IsString()
  @MaxLength(50)
  readonly name: string;

  @Field(() => String)
  @IsString()
  @MaxLength(255)
  readonly bio: string;
}
