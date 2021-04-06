import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/module/user/user.entity';
import {
  CreatePostInput,
  PostQueryValue,
  UpdatePostInput,
} from './dto/post.input';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => Post)
  async post(@Args('idx') idx: number): Promise<Post> {
    return await this.postService.post(idx);
  }

  @Query(() => Int)
  async commentCount(@Args('idx') idx: number): Promise<number> {
    return await this.postService.commentCount(idx);
  }

  @Query(() => [Post])
  async userPosts(
    @Args('idx') userIdx: number,
    @Args('option') { page, limit }: PostQueryValue,
  ): Promise<Post[]> {
    return await this.postService.userPosts(userIdx, page, limit);
  }

  @Query(() => [Post])
  async posts(
    @Args('option') { page, limit }: PostQueryValue,
  ): Promise<Post[]> {
    return await this.postService.posts(page, limit);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Post)
  async createPost(
    @GetUser() user: User,
    @Args('post') data: CreatePostInput,
  ): Promise<Post> {
    return await this.postService.create(data, user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Post)
  async updatePost(
    @GetUser() user: User,
    @Args('idx') idx: number,
    @Args('post') data: UpdatePostInput,
  ) {
    return await this.postService.update(idx, data, user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Post)
  async deletePost(@GetUser() user: User, @Args('idx') idx: number) {
    return await this.postService.delete(idx, user);
  }
}
