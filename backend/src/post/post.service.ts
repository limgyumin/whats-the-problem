import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostInput, UpdatePostInput } from './dto/post.input';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private userService: UserService,
  ) {}

  async create(data: CreatePostInput, user: User): Promise<Post> {
    const post = this.postRepository.create(data);
    post.user = user;
    return await post.save();
  }

  async update(idx: number, data: UpdatePostInput, user: User) {
    const post = await this.findOneByIdx(idx);

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
    const post = await this.findOneByIdx(idx);

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
    const post = await this.findOneByIdx(idx);

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

  async posts(page: number, limit: number): Promise<Post[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Invalid page or limit.');
    }

    const posts = await this.findAll(page, limit);

    for (const post of posts) {
      const user = await this.userService.findOneByIdx(post.fk_user_idx);
      post.user = user;
    }

    return posts;
  }

  findOneByIdx(idx: number): Promise<Post> {
    return this.postRepository
      .createQueryBuilder()
      .where('idx = :idx', { idx })
      .getOne();
  }

  findAll(page: number, limit: number): Promise<Post[]> {
    return this.postRepository
      .createQueryBuilder()
      .orderBy('created_at', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }
}
