import { registerEnumType } from '@nestjs/graphql';

export enum QuestionType {
  CreatedAt = 'createdAt',
  Answer = 'answer',
}

registerEnumType(QuestionType, { name: 'QuestionType' });
