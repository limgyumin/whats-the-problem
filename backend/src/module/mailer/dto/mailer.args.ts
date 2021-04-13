import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

@ArgsType()
class BaseMailerArgs {
  @Field(() => String)
  @IsEmail()
  @MaxLength(255)
  readonly email: string;
}

@ArgsType()
export class CreateMailerArgs extends BaseMailerArgs {}

@ArgsType()
export class VerifyMailerArgs extends BaseMailerArgs {
  @Field(() => String)
  @IsString()
  @Length(5, 5)
  readonly verifyCode: string;
}
