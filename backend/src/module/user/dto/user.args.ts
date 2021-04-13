import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { UserType } from 'src/enum/user.enum';
import { UserOption } from './user.input';

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

@ArgsType()
export class GetUsersArgs {
  @Field(() => UserType)
  @IsEnum(UserType)
  readonly userType: UserType;

  @Field(() => UserOption)
  @Type(() => UserOption)
  @ValidateNested()
  readonly option: UserOption;
}
