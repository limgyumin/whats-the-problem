import { registerEnumType } from '@nestjs/graphql';

export enum CommentType {
  Post = 'post',
  Answer = 'answer',
}

registerEnumType(CommentType, { name: 'CommentType' });
