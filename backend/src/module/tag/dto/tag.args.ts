import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString, MaxLength } from 'class-validator';

@ArgsType()
class BaseTagArgs {
  @Field(() => Int)
  @IsNumber()
  readonly idx: number;
}

@ArgsType()
export class GetTagArgs extends BaseTagArgs {}

@ArgsType()
export class UpdateTagArgs extends BaseTagArgs {
  @Field(() => String)
  @IsString()
  @MaxLength(100)
  readonly name: string;
}

@ArgsType()
export class DeleteTagArgs extends BaseTagArgs {}
