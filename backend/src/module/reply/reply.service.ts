import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Comment } from '../comment/comment.entity';
import { CommentRepository } from '../comment/comment.repository';
import { User } from '../user/user.entity';
import { Reply } from './reply.entity';
import { ReplyRepository } from './reply.repository';

@Injectable()
export class ReplyService {
  constructor(
    private replyRepository: ReplyRepository,
    private commentRepository: CommentRepository,
  ) {}

  async create(
    commentIdx: number,
    content: string,
    user: User,
  ): Promise<Reply> {
    const comment: Comment = await this.commentRepository.findOneByIdx(
      commentIdx,
    );

    if (!comment) {
      throw new NotFoundException('Comment not found.');
    }

    const reply: Reply = this.replyRepository.create();

    reply.content = content;
    reply.comment = comment;
    reply.user = user;

    return await reply.save();
  }

  async update(idx: number, content: string, user: User): Promise<Reply> {
    const reply: Reply = await this.replyRepository.findOneByIdx(idx);

    if (!reply) {
      throw new NotFoundException('Reply not found.');
    }

    if (reply.fk_user_idx !== user.idx) {
      throw new ForbiddenException('No permission.');
    }

    reply.content = content;
    reply.user = user;
    reply.updated_at = new Date();

    return reply.save();
  }

  async delete(idx: number, user: User): Promise<Reply> {
    const reply: Reply = await this.replyRepository.findOneByIdx(idx);

    if (!reply) {
      throw new NotFoundException('Reply not found.');
    }

    if (reply.fk_user_idx !== user.idx) {
      throw new ForbiddenException('No permission.');
    }

    reply.user = user;

    return reply.remove();
  }

  async replies(commentIdx: number): Promise<Reply[]> {
    const comment: Comment = await this.commentRepository.findOneByIdx(
      commentIdx,
    );

    if (!comment) {
      throw new NotFoundException('Comment not found.');
    }

    const replies: Reply[] = await this.replyRepository.findAllWithUserOrderByCreatedAtASC(
      comment.idx,
    );

    return replies;
  }
}
