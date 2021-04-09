import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/decorator/role.decorator';
import { GetUser } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from '../user/user.entity';
import { LikeObject } from './dto/like.object';
import { Like } from './like.entity';
import { LikeService } from './like.service';

@Resolver(Like)
export class LikeResolver {
  constructor(private likeService: LikeService) {}

  @Query(() => LikeObject)
  @Roles('Any')
  @UseGuards(AuthGuard)
  async like(@Args('postIdx') postIdx: number) {
    return await this.likeService.like(postIdx);
  }

  @Mutation(() => Like)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async postLike(
    @Args('postIdx') postIdx: number,
    @GetUser() user: User,
  ): Promise<Like> {
    return await this.likeService.postLike(postIdx, user);
  }
}
