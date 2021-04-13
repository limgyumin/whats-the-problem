import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly avatar: string;

  @Field(() => String)
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @Field(() => String)
  @IsEmail()
  @MaxLength(255)
  readonly email: string;

  @Field(() => String)
  @IsString()
  @Length(8, 100)
  readonly password: string;

  @Field(() => String)
  @IsString()
  @MaxLength(255)
  readonly bio: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly avatar: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Length(8, 100)
  readonly password: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly bio: string;
}

@InputType()
export class UserOption {
  @Field(() => Int)
  @IsNumber()
  readonly page: number;

  @Field(() => Int)
  @IsNumber()
  readonly limit: number;
}

@InputType()
export class UserPostOption extends UserOption {}

@InputType()
export class UserQuestionOption extends UserOption {}
