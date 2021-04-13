import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  @IsString()
  @MaxLength(255)
  readonly title: string;

  @Field(() => String)
  @IsString()
  readonly content: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly thumbnail: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  readonly isTemp: boolean;

  @Field(() => [PostTagInput], { nullable: true })
  @IsOptional()
  @IsArray()
  readonly tags: PostTagInput[];
}

@InputType()
export class UpdatePostInput extends CreatePostInput {}

@InputType()
export class PostTagInput {
  @Field(() => String)
  @IsString()
  @MaxLength(255)
  readonly name: string;
}

@InputType()
export class PostOption {
  @Field(() => Int)
  @IsNumber()
  readonly page: number;

  @Field(() => Int)
  @IsNumber()
  readonly limit: number;
}
