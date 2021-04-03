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
      const decoded = validateToken(token);
      let user: User;

      if (decoded.github_id) {
        user = await this.userService.findOneByGitHubId(decoded.github_id);
      } else {
        user = await this.userService.findOneByEmail(decoded.email);
      }

      if (user) {
        ctx.user = user;
        return true;
      } else {
        throw new NotFoundException('User not found.');
      }
    } else {
      return false;
    }
  }
}
