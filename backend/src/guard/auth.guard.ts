import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { validateToken } from 'src/lib/token';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}
  // canActivate 메서드로부터 토큰의 존재 여부에 따라 다음 행동의 권한을 얻음.
  async canActivate(context: ExecutionContext) {
    // Gql context 가져오기
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.headers.authorization;

    if (token) {
      // decodedUser는 token을 생성할 때 payload로 넣었던 데이터만 가지고 있음.
      const decodedUser: User = validateToken(token);
      const user = await this.userService.findUserByEmailOrGitHubId(
        decodedUser,
      );

      ctx.user = user;
      return true;
    } else {
      return false;
    }
  }
}
