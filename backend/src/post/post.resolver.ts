import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
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
  constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}

  @Query(() => [Post])
  async posts(@Args('option') { page, limit }: QueryValue): Promise<Post[]> {
    if (!page || !limit) {
      throw new BadRequestException('Page or limit is null.');
    }

    if (page < 1) {
      throw new BadRequestException('Page is invalid number');
    }

    const posts = await this.postService.findAll(page, limit);

    for (const post of posts) {
      const user = await this.userService.findOneByIdx(post.fk_user_idx);
      post.user = user;
    }

    return posts;
  }

  @Query(() => Post)
  async post(@Args('idx') idx: number): Promise<Post> {
    const post = await this.postService.findOneByIdx(idx);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    const user = await this.userService.findOneByIdx(post.fk_user_idx);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    post.user = user;

    return post;
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
    const post = await this.postService.findOneByIdx(idx);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    if (post.fk_user_idx !== user.idx) {
      throw new UnauthorizedException('No permission.');
    }

    return await this.postService.update(post, data, user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Post)
  async deletePost(@GetUser() user: User, @Args('idx') idx: number) {
    const post = await this.postService.findOneByIdx(idx);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    if (post.fk_user_idx !== user.idx) {
      throw new UnauthorizedException('No permission.');
    }

    return await this.postService.delete(post, user);
  }
}
