import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CREATE_ANSWER, DELETE_ANSWER } from 'src/constants/user-scores';
import { Comment } from '../comment/comment.entity';
import { CommentRepository } from '../comment/comment.repository';
import { Question } from '../question/question.entity';
import { QuestionRepository } from '../question/question.repository';
import { ReplyRepository } from '../reply/reply.repository';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Answer } from './answer.entity';
import { AnswerRepository } from './answer.repository';

@Injectable()
export class AnswerService {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
    private commentRepository: CommentRepository,
    private replyRepository: ReplyRepository,
    private userService: UserService,
  ) {}

  async create(
    questionIdx: number,
    content: string,
    user: User,
  ): Promise<Answer> {
    const question: Question = await this.questionRepository.findOneByIdx(
      questionIdx,
      false,
    );

    if (!question) {
      throw new NotFoundException('Question not found.');
    }

    const answer: Answer = this.answerRepository.create();

    answer.content = content;
    answer.question = question;
    answer.user = user;

    await this.userService.handleScore(user.idx, CREATE_ANSWER);

    return await answer.save();
  }

  async update(idx: number, content: string, user: User): Promise<Answer> {
    const answer: Answer = await this.answerRepository.findOneByIdx(idx);

    if (!answer) {
      throw new NotFoundException('Answer not found.');
    }

    if (answer.fk_user_idx !== user.idx) {
      throw new ForbiddenException('No permission.');
    }

    answer.content = content;
    answer.user = user;
    answer.updated_at = new Date();

    return await answer.save();
  }

  async delete(idx: number, user: User): Promise<Answer> {
    const answer: Answer = await this.answerRepository.findOneByIdx(idx);

    if (!answer) {
      throw new NotFoundException('Answer not found.');
    }

    if (answer.fk_user_idx !== user.idx) {
      throw new ForbiddenException('No permission.');
    }

    answer.user = user;

    await this.userService.handleScore(user.idx, DELETE_ANSWER);

    return await answer.remove();
  }

  async commentCount(idx: number): Promise<number> {
    return await this.getCommentCountByAnswerIdx(idx);
  }

  async answers(questionIdx: number): Promise<Answer[]> {
    const question: Question = await this.questionRepository.findOneByIdx(
      questionIdx,
      false,
    );

    if (!question) {
      throw new NotFoundException('Question not found.');
    }

    const answers: Answer[] = await this.answerRepository.findAllWithUserByQuestionIdxOrderByCreatedAtASC(
      question.idx,
    );

    return answers;
  }

  async getCommentCountByAnswerIdx(answerIdx: number): Promise<number> {
    const comments: Comment[] = await this.commentRepository.findAllByAnswerIdxOrderByCreatedAtASC(
      answerIdx,
    );

    let commentCount: number = comments.length;

    // 비동기 작업 동시 실행.
    const promises: Promise<void>[] = [];

    for (const comment of comments) {
      const promise: Promise<void> = new Promise(async (resolve, reject) => {
        if (!comment) resolve();

        const replyCount: number = await this.replyRepository.findAllAndCount(
          comment.idx,
        );
        commentCount += replyCount;

        resolve();
      });

      promises.push(promise);
    }

    await Promise.all(promises);

    return commentCount;
  }
}
