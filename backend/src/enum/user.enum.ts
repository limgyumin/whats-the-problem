import { registerEnumType } from '@nestjs/graphql';

export enum UserType {
  CreatedAt = 'createdAt',
  Score = 'score',
}

registerEnumType(UserType, { name: 'UserType' });
