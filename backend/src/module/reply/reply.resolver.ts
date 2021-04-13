import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/decorator/role.decorator';
import { GetUser } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from '../user/user.entity';
import {
  CreateReplyArgs,
  DeleteReplyArgs,
  GetRepliesArgs,
  UpdateReplyArgs,
} from './dto/reply.args';
import { Reply } from './reply.entity';
import { ReplyService } from './reply.service';

@Resolver(Reply)
export class ReplyResolver {
  constructor(private replyService: ReplyService) {}

  @Query(() => [Reply])
  async replies(@Args() { commentIdx }: GetRepliesArgs): Promise<Reply[]> {
    return this.replyService.replies(commentIdx);
  }

  @Mutation(() => Reply)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async createReply(
    @Args() { commentIdx, content }: CreateReplyArgs,
    @GetUser() user: User,
  ): Promise<Reply> {
    return await this.replyService.create(commentIdx, content, user);
  }

  @Mutation(() => Reply)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async updateReply(
    @Args() { idx, content }: UpdateReplyArgs,
    @GetUser() user: User,
  ): Promise<Reply> {
    return await this.replyService.update(idx, content, user);
  }

  @Mutation(() => Reply)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async deleteReply(
    @Args() { idx }: DeleteReplyArgs,
    @GetUser() user: User,
  ): Promise<Reply> {
    return await this.replyService.delete(idx, user);
  }
}
