import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/module/user/user.entity';
import { UserRepository } from 'src/module/user/user.repository';
import { Comment } from '../comment/comment.entity';
import { CommentRepository } from '../comment/comment.repository';
import { ReplyRepository } from '../reply/reply.repository';
import { CreatePostInput, UpdatePostInput } from './dto/post.input';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
    private commentRepository: CommentRepository,
    private replyRepository: ReplyRepository,
  ) {}

  async create(data: CreatePostInput, user: User): Promise<Post> {
    const post: Post = this.postRepository.create(data);
    post.user = user;
    return await post.save();
  }

  async update(idx: number, data: UpdatePostInput, user: User) {
    const post: Post = await this.postRepository.findOneByIdx(idx, false);

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

    return await post.save();
  }

  async delete(idx: number, user: User) {
    const post: Post = await this.postRepository.findOneByIdx(idx, false);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    if (post.fk_user_idx !== user.idx) {
      throw new ForbiddenException('No permission.');
    }

    post.user = user;
    return await post.remove();
  }

  async userPosts(userIdx: number, page: number, limit: number) {
    const user: User = await this.userRepository.findOneByIdx(userIdx);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const posts: Post[] = await this.postRepository.findAllByUserIdx(
      page,
      limit,
      user.idx,
      false,
    );

    for (const post of posts) {
      const user: User = await this.userRepository.findOneByIdx(
        post.fk_user_idx,
      );

      const commentCount: number = await this.getCommentCountByPostIdx(
        post.idx,
      );

      post.user = user;
      post.comment_count = commentCount;
    }

    return posts;
  }

  async commentCount(idx: number): Promise<number> {
    const post: Post = await this.postRepository.findOneByIdx(idx, false);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    return await this.getCommentCountByPostIdx(post.idx);
  }

  async post(idx: number): Promise<Post> {
    const post: Post = await this.postRepository.findOneByIdx(idx, false);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    const user: User = await this.userRepository.findOneByIdx(post.fk_user_idx);

    post.user = user;

    return post;
  }

  async posts(page: number, limit: number): Promise<Post[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Invalid page or limit.');
    }

    const posts: Post[] = await this.postRepository.findAll(page, limit, false);

    for (const post of posts) {
      const user: User = await this.userRepository.findOneByIdx(
        post.fk_user_idx,
      );

      const commentCount: number = await this.getCommentCountByPostIdx(
        post.idx,
      );

      post.user = user;
      post.comment_count = commentCount;
    }

    return posts;
  }

  async getCommentCountByPostIdx(postIdx: number): Promise<number> {
    const comments: Comment[] = await this.commentRepository.findAll(postIdx);

    let commentCount: number = comments.length;

    for (const comment of comments) {
      const replyCount: number = await this.replyRepository.findAllAndCount(
        comment.idx,
      );
      commentCount += replyCount;
    }

    return commentCount;
  }
}
