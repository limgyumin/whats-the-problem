import { registerEnumType } from '@nestjs/graphql';

export enum PostType {
  CreatedAt = 'createdAt',
  Like = 'like',
}

registerEnumType(PostType, { name: 'PostType' });
