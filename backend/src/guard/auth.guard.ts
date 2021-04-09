import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AllowedRole } from 'src/enum/role.enum';
import { validateToken } from 'src/lib/jwt/token';
import { User } from 'src/module/user/user.entity';
import { UserService } from 'src/module/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private reflector: Reflector) {}
  // canActivate 메서드로부터 토큰의 존재 여부에 따라 다음 행동의 권한을 얻음.
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRole>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      throw new ForbiddenException('No permission.');
    }

    // Gql context 가져오기
    const gqlContext = GqlExecutionContext.create(context).getContext();

    const token = gqlContext.headers.authorization;

    // 로그인을 하지 않아도 됨. token이 있다면 user를 조회하여 context.user에 넣어줌
    if (roles.includes('Any')) {
      if (token) {
        const decodedUser: User = validateToken(token);
        const validUser = await this.userService.findUserByEmailOrGitHubId(
          decodedUser,
        );
        gqlContext.user = validUser;
      }

      return true;
    }

    // 로그인을 해야함. token이 있으면 pass 없으면 block.
    if (roles.includes('Client')) {
      if (token) {
        const decodedUser: User = validateToken(token);
        const validUser = await this.userService.findUserByEmailOrGitHubId(
          decodedUser,
        );
        gqlContext.user = validUser;

        return true;
      } else {
        return false;
      }
    }

    // 로그인을 해야하고 is_admin도 true여야함. 맞으면 pass 아니면 block.
    if (roles.includes('Admin')) {
      if (token) {
        const decodedUser: User = validateToken(token);
        const validUser = await this.userService.findUserByEmailOrGitHubId(
          decodedUser,
        );

        if (!validUser.is_admin) {
          throw new ForbiddenException('No permission.');
        }

        gqlContext.user = validUser;

        return true;
      } else {
        return false;
      }
    }
  }
}
