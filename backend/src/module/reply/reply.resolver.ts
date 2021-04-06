import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from '../user/user.entity';
import { Reply } from './reply.entity';
import { ReplyService } from './reply.service';

@Resolver()
export class ReplyResolver {
  constructor(private replyService: ReplyService) {}

  @Query(() => [Reply])
  async replies(@Args('commentIdx') commentIdx: number): Promise<Reply[]> {
    return this.replyService.replies(commentIdx);
  }

  @Mutation(() => Reply)
  @UseGuards(AuthGuard)
  async createReply(
    @Args('commentIdx') commentIdx: number,
    @Args('content') content: string,
    @GetUser() user: User,
  ): Promise<Reply> {
    return await this.replyService.create(commentIdx, content, user);
  }

  @Mutation(() => Reply)
  @UseGuards(AuthGuard)
  async updateReply(
    @Args('idx') idx: number,
    @Args('content') content: string,
    @GetUser() user: User,
  ): Promise<Reply> {
    return await this.replyService.update(idx, content, user);
  }

  @Mutation(() => Reply)
  @UseGuards(AuthGuard)
  async deleteReply(
    @Args('idx') idx: number,
    @GetUser() user: User,
  ): Promise<Reply> {
    return await this.replyService.delete(idx, user);
  }
}
