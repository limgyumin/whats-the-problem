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
import {
  CreateCommentArgs,
  DeleteCommentArgs,
  GetCommentsArgs,
  UpdateCommentArgs,
} from './dto/comment.args';

@Resolver(Comment)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query(() => [Comment])
  async comments(
    @Args() { parentIdx, commentType }: GetCommentsArgs,
  ): Promise<Comment[]> {
    return await this.commentService.comments(parentIdx, commentType);
  }

  @ResolveField(() => Int)
  async replyCount(@Parent() parent: Comment): Promise<number> {
    return await this.commentService.replyCount(parent.idx);
  }

  @Mutation(() => Comment)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async createComment(
    @Args() { parentIdx, content, commentType }: CreateCommentArgs,
    @GetUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.create(
      parentIdx,
      content,
      commentType,
      user,
    );
  }

  @Mutation(() => Comment)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async updateComment(
    @Args() { idx, content }: UpdateCommentArgs,
    @GetUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.update(idx, content, user);
  }

  @Mutation(() => Comment)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async deleteComment(
    @Args() { idx }: DeleteCommentArgs,
    @GetUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.delete(idx, user);
  }
}
