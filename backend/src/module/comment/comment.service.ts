import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post } from 'src/module/post/post.entity';
import { PostRepository } from 'src/module/post/post.repository';
import { ReplyRepository } from '../reply/reply.repository';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private postRepository: PostRepository,
    private replyRepository: ReplyRepository,
  ) {}

  async create(postIdx: number, content: string, user: User): Promise<Comment> {
    const post: Post = await this.postRepository.findOneByIdx(postIdx, false);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    const comment: Comment = this.commentRepository.create();

    comment.content = content;
    comment.post = post;
    comment.user = user;

    return await comment.save();
  }

  async update(idx: number, content: string, user: User): Promise<Comment> {
    const comment: Comment = await this.commentRepository.findOneByIdx(idx);

    if (!comment) {
      throw new NotFoundException('Comment not found.');
    }

    if (comment.fk_user_idx !== user.idx) {
      throw new ForbiddenException('No permission.');
    }

    comment.content = content;
    comment.user = user;

    return await comment.save();
  }

  async delete(idx: number, user: User): Promise<Comment> {
    const comment = await this.commentRepository.findOneByIdx(idx);

    if (!comment) {
      throw new NotFoundException('Comment not found.');
    }

    if (comment.fk_user_idx !== user.idx) {
      throw new ForbiddenException('No permission.');
    }

    comment.user = user;

    return await comment.remove();
  }

  async comments(postIdx: number): Promise<Comment[]> {
    const post: Post = await this.postRepository.findOneByIdx(postIdx, false);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    const comments: Comment[] = await this.commentRepository.findAllWithUser(
      post.idx,
    );

    return comments;
  }

  async replyCount(commentIdx: number): Promise<number> {
    const comment: Comment = await this.commentRepository.findOneByIdx(
      commentIdx,
    );

    if (!comment) {
      throw new NotFoundException('Comment not found.');
    }

    return await this.replyRepository.findAllAndCount(comment.idx);
  }
}
