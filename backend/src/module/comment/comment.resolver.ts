import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Resolver()
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query(() => [Comment])
  async comments(@Args('postIdx') postIdx: number): Promise<Comment[]> {
    return this.commentService.comments(postIdx);
  }

  @Mutation(() => Comment)
  @UseGuards(AuthGuard)
  async createComment(
    @Args('postIdx') postIdx: number,
    @Args('content') content: string,
    @GetUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.create(postIdx, content, user);
  }

  @Mutation(() => Comment)
  @UseGuards(AuthGuard)
  async updateComment(
    @Args('idx') idx: number,
    @Args('content') content: string,
    @GetUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.update(idx, content, user);
  }

  @Mutation(() => Comment)
  @UseGuards(AuthGuard)
  async deleteComment(
    @Args('idx') idx: number,
    @GetUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.delete(idx, user);
  }
}
