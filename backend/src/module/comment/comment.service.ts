import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
} from 'src/common/constants/user-scores';
import { CommentType } from 'src/enum/comment.enum';
import { Post } from 'src/module/post/post.entity';
import { PostRepository } from 'src/module/post/post.repository';
import { Answer } from '../answer/answer.entity';
import { AnswerRepository } from '../answer/answer.repository';
import { ReplyRepository } from '../reply/reply.repository';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private postRepository: PostRepository,
    private answerRepository: AnswerRepository,
    private replyRepository: ReplyRepository,
    private userService: UserService,
  ) {}

  async create(
    parentIdx: number,
    content: string,
    commentType: CommentType,
    user: User,
  ): Promise<Comment> {
    let post: Post | null = null;
    let answer: Answer | null = null;

    switch (commentType) {
      case CommentType.Post:
        post = await this.postRepository.findOneByIdx(parentIdx, false);
        break;
      case CommentType.Answer:
        answer = await this.answerRepository.findOneByIdx(parentIdx);
        break;
    }

    if (!post && !answer) {
      throw new NotFoundException('Post or Answer not found.');
    }

    const comment: Comment = this.commentRepository.create();

    comment.content = content;
    comment.post = post;
    comment.answer = answer;
    comment.comment_type = commentType;
    comment.user = user;

    await this.userService.handleScore(user.idx, CREATE_COMMENT);

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
    comment.updated_at = new Date();

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

    await this.userService.handleScore(user.idx, DELETE_COMMENT);

    return await comment.remove();
  }

  async comments(
    parentIdx: number,
    commentType: CommentType,
  ): Promise<Comment[]> {
    let comments: Comment[];

    switch (commentType) {
      case CommentType.Post:
        const post: Post = await this.postRepository.findOneByIdx(
          parentIdx,
          false,
        );

        if (!post) {
          throw new NotFoundException('Post not found.');
        }

        comments = await this.commentRepository.findAllWithUserByPostIdx(
          post.idx,
        );

        break;

      case CommentType.Answer:
        const answer: Answer = await this.answerRepository.findOneByIdx(
          parentIdx,
        );

        if (!answer) {
          throw new NotFoundException('Answer not found.');
        }

        comments = await this.commentRepository.findAllWithUserByAnswerIdx(
          answer.idx,
        );

        break;
    }

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
