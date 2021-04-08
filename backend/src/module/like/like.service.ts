import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '../post/post.entity';
import { PostRepository } from '../post/post.repository';
import { User } from '../user/user.entity';
import { Like } from './like.entity';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(
    private likeRepository: LikeRepository,
    private postRepository: PostRepository,
  ) {}

  async postLike(postIdx: number, user: User): Promise<Like> {
    const post: Post = await this.postRepository.findOneByIdx(postIdx, false);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    let like: Like = await this.likeRepository.findOneByPostIdxAndUserIdx(
      postIdx,
      user.idx,
    );

    if (like) {
      like.user = user;
      return await like.remove();
    }

    like = this.likeRepository.create();
    like.post = post;
    like.user = user;

    return await like.save();
  }

  async likes(postIdx: number): Promise<Like[]> {
    const post: Post = await this.postRepository.findOneByIdx(postIdx, false);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    return await this.likeRepository.findAllWithUserByPostIdx(postIdx);
  }

  async liked(postIdx: number, user: User): Promise<boolean> {
    const post: Post = await this.postRepository.findOneByIdx(postIdx, false);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    if (!user) {
      return false;
    }

    // 자기가 누른 좋아요 찾기
    const like: Like = await this.likeRepository.findOneByPostIdxAndUserIdx(
      postIdx,
      user.idx,
    );

    const liked: boolean = Boolean(like);

    return liked;
  }
}
