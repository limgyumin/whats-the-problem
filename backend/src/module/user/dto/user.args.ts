import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

@ArgsType()
export class LoginArgs {
  @Field(() => String)
  @IsEmail()
  @MaxLength(255)
  readonly email: string;

  @Field(() => String)
  @IsString()
  @Length(8, 100)
  readonly password: string;
}
