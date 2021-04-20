import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AnswerRepository } from '../answer/answer.repository';
import { Tag } from '../tag/tag.entity';
import { TagRepository } from '../tag/tag.repository';
import { User } from '../user/user.entity';
import {
  CreateQuestionInput,
  QuestionTagInput,
  UpdateQuestionInput,
} from './dto/question.input';
import { Question } from './question.entity';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
    private tagRepository: TagRepository,
  ) {}

  async create(data: CreateQuestionInput, user: User): Promise<Question> {
    const { title, content, isTemp, tags } = data;

    const question: Question = this.questionRepository.create();

    const tagList: Tag[] = await this.findOrCreateTagsAndGet(tags);

    question.title = title;
    question.content = content;
    question.isTemp = isTemp;
    question.tags = tagList;
    question.user = user;

    return await question.save();
  }

  async update(
    idx: number,
    data: UpdateQuestionInput,
    user: User,
  ): Promise<Question> {
    const { title, content, tags, isTemp } = data;

    const question: Question = await this.questionRepository.findOneByIdx(
      idx,
      false,
    );

    if (!question) {
      throw new NotFoundException('Question not found.');
    }

    if (question.userIdx !== user.idx) {
      throw new ForbiddenException('No permission.');
    }

    const tagList: Tag[] = await this.findOrCreateTagsAndGet(tags);

    question.title = title || question.title;
    question.content = content || question.content;
    question.isTemp = isTemp;
    question.tags = tagList;
    question.user = user;
    question.updatedAt = new Date();

    return await question.save();
  }

  async delete(idx: number, user: User): Promise<Question> {
    const question: Question = await this.questionRepository.findOneByIdx(
      idx,
      false,
    );

    if (!question) {
      throw new NotFoundException('Post not found.');
    }

    if (question.userIdx !== user.idx) {
      throw new ForbiddenException('No permission.');
    }

    question.user = user;

    return await question.remove();
  }

  async question(idx: number): Promise<Question> {
    const question: Question = await this.questionRepository.findOneWithTagsAndUserByIdx(
      idx,
      false,
    );

    if (!question) {
      throw new NotFoundException('Question not found.');
    }

    return question;
  }

  async questions(page: number, limit: number): Promise<Question[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Invalid page or limit.');
    }

    const questions: Question[] = await this.questionRepository.findAllWithTagsAndUserOrderByCreatedAtASC(
      page,
      limit,
      false,
    );

    return questions;
  }

  async answerCount(idx: number): Promise<number> {
    return await this.answerRepository.findAllAndCountByQuestionIdxOrderByCreatedAtASC(
      idx,
    );
  }

  async findOrCreateTagsAndGet(tags: QuestionTagInput[]): Promise<Tag[]> {
    // data.tags를 바로 넣지 않고, tag를 조회 또는 추가하여
    // 배열에 삽입 한 후 배열을 question.tags에 할당 해줄거에요.
    let insertTags: Tag[] = [];

    if (tags && tags.length) {
      for (const tag of tags) {
        let insertTag: Tag = await this.tagRepository.findOneByName(tag.name);

        if (!insertTag) {
          insertTag = await this.tagRepository.create(tag).save();
        }

        insertTags = [...insertTags, insertTag];
      }
    }

    return insertTags;
  }
}
