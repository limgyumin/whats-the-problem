import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/user/model/user.model';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const user: User = GqlExecutionContext.create(ctx).getContext().user;
    return user;
  },
);
