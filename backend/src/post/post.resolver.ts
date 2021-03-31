import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { QueryValue } from 'src/user/dto/user.input';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreatePostInput, UpdatePostInput } from './dto/post.input';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  async posts(@Args('option') { page, limit }: QueryValue): Promise<Post[]> {
    return await this.postService.posts(page, limit);
  }

  @Query(() => Post)
  async post(@Args('idx') idx: number): Promise<Post> {
    return await this.postService.post(idx);
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
