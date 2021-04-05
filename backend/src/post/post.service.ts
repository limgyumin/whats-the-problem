import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { CreatePostInput, UpdatePostInput } from './dto/post.input';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
  ) {}

  async create(data: CreatePostInput, user: User): Promise<Post> {
    const post = this.postRepository.create(data);
    post.user = user;
    return await post.save();
  }

  async update(idx: number, data: UpdatePostInput, user: User) {
    const post = await this.postRepository.findOneByIdx(idx);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    if (post.fk_user_idx !== user.idx) {
      throw new ForbiddenException('No permission.');
    }

    post.title = data.title || post.title;
    post.content = data.content || post.content;
    post.thumbnail = data.thumbnail || post.thumbnail;
    post.user = user;

    return await this.postRepository.save(post);
  }

  async delete(idx: number, user: User) {
    const post = await this.postRepository.findOneByIdx(idx);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    if (post.fk_user_idx !== user.idx) {
      throw new ForbiddenException('No permission.');
    }

    post.user = user;
    return await this.postRepository.remove(post);
  }

  async post(idx: number): Promise<Post> {
    const post = await this.postRepository.findOneByIdx(idx);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    const user = await this.userRepository.findOneByIdx(post.fk_user_idx);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    post.user = user;

    return post;
  }

  async posts(page: number, limit: number): Promise<Post[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Invalid page or limit.');
    }

    const posts = await this.postRepository.findAll(page, limit);

    for (const post of posts) {
      const user = await this.userRepository.findOneByIdx(post.fk_user_idx);
      post.user = user;
    }

    return posts;
  }
}
