import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Roles } from 'src/decorator/role.decorator';
import { GetUser } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Resolver(Comment)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query(() => [Comment])
  async comments(@Args('postIdx') postIdx: number): Promise<Comment[]> {
    return await this.commentService.comments(postIdx);
  }

  @ResolveField(() => Int)
  async replyCount(@Parent() parent: Comment): Promise<number> {
    return await this.commentService.replyCount(parent.idx);
  }

  @Mutation(() => Comment)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async createComment(
    @Args('postIdx') postIdx: number,
    @Args('content') content: string,
    @GetUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.create(postIdx, content, user);
  }

  @Mutation(() => Comment)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async updateComment(
    @Args('idx') idx: number,
    @Args('content') content: string,
    @GetUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.update(idx, content, user);
  }

  @Mutation(() => Comment)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async deleteComment(
    @Args('idx') idx: number,
    @GetUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.delete(idx, user);
  }
}
