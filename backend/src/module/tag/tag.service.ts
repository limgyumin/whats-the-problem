import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post } from '../post/post.entity';
import { PostRepository } from '../post/post.repository';
import { Tag } from './tag.entity';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    private tagRepository: TagRepository,
    private postRepository: PostRepository,
  ) {}

  async create(name: string): Promise<Tag> {
    const existTag: Tag = await this.tagRepository.findOneByName(name);

    if (existTag) {
      throw new ConflictException('Tag already exist.');
    }

    const tag: Tag = this.tagRepository.create();
    tag.name = name;

    return await tag.save();
  }

  async update(idx: number, name: string): Promise<Tag> {
    const tag: Tag = await this.tagRepository.findOneByIdx(idx);

    if (!tag) {
      throw new NotFoundException('Tag not found.');
    }

    tag.name = name;

    return await tag.save();
  }

  async delete(idx: number): Promise<Tag> {
    const tag: Tag = await this.tagRepository.findOneByIdx(idx);

    if (!tag) {
      throw new NotFoundException('Tag not found.');
    }

    return await tag.remove();
  }

  async tag(idx: number): Promise<Tag> {
    const tag: Tag = await this.tagRepository.findOneByIdx(idx);

    if (!tag) {
      throw new NotFoundException('Tag not found.');
    }

    return tag;
  }

  async tagPosts(idx: number, page: number, limit: number): Promise<Post[]> {
    const tag: Tag = await this.tagRepository.findOneByIdx(idx);

    if (!tag) {
      throw new NotFoundException('Tag not found.');
    }

    const posts: Post[] = await this.postRepository.findAllWithUserByTagIdx(
      idx,
      page,
      limit,
    );

    return posts;
  }

  async tags(): Promise<Tag[]> {
    return await this.tagRepository.findAllOrderByIdxASC();
  }

  async postCount(tagIdx: number): Promise<number> {
    const tag: Tag = await this.tagRepository.findOneByIdx(tagIdx);

    if (!tag) {
      throw new NotFoundException('Tag not found.');
    }

    return await this.postRepository.findAllAndCountWithTagsByTagIdx(tag.idx);
  }
}
