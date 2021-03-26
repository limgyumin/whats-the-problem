import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { validateToken } from 'src/lib/token';

@Injectable()
export class AuthGuard implements CanActivate {
  // canActivate 메서드로부터 토큰의 존재 여부에 따라 다음 행동의 권한을 얻음.
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Gql context에서 request 객체 가져오기
    const ctx = GqlExecutionContext.create(context).getContext();

    if (ctx.headers && ctx.headers.authorization) {
      ctx.user = validateToken(ctx.headers.authorization);
      return true;
    } else {
      return false;
    }
  }
}
