import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput, UpdatePostInput } from './dto/post.input';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(data: CreatePostInput, user: User): Promise<Post> {
    const post = this.postRepository.create(data);
    post.user = user;
    return await post.save();
  }

  async update(post: Post, data: UpdatePostInput, user: User) {
    post.title = data.title || post.title;
    post.description = data.description || post.description;
    post.content = data.content || post.content;
    post.thumbnail = data.thumbnail || post.thumbnail;
    post.user = user;

    return await this.postRepository.save(post);
  }

  async delete(post: Post, user: User) {
    post.user = user;
    return await this.postRepository.remove(post);
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
