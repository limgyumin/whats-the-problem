import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Roles } from 'src/decorator/role.decorator';
import { GetUser } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import {
  DeleteQuestionArgs,
  GetQuestionArgs,
  GetQuestionsArgs,
  UpdateQuestionArgs,
} from './dto/question.args';
import { CreateQuestionInput } from './dto/question.input';
import { Question } from './question.entity';
import { QuestionService } from './question.service';

@Resolver(Question)
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Query(() => Question)
  async question(@Args() { url }: GetQuestionArgs): Promise<Question> {
    return await this.questionService.question(url);
  }

  @Query(() => [Question])
  async questions(
    @Args() { questionType, option: { page, limit } }: GetQuestionsArgs,
  ): Promise<Question[]> {
    return await this.questionService.questions(page, limit, questionType);
  }

  @ResolveField(() => [Tag])
  async tags(@Parent() parent: Question): Promise<Tag[]> {
    return await this.questionService.tags(parent.idx);
  }

  @Query(() => Int)
  async questionCount(): Promise<number> {
    return await this.questionService.questionCount();
  }

  @ResolveField(() => Int)
  async answerCount(@Parent() parent: Question): Promise<number> {
    return await this.questionService.answerCount(parent.idx);
  }

  @Mutation(() => Question)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async createQuestion(
    @GetUser() user: User,
    @Args('question') data: CreateQuestionInput,
  ) {
    return await this.questionService.create(data, user);
  }

  @Mutation(() => Question)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async updateQuestion(
    @GetUser() user: User,
    @Args() { uuid, question }: UpdateQuestionArgs,
  ) {
    return await this.questionService.update(uuid, question, user);
  }

  @Mutation(() => Question)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async deleteQuestion(
    @GetUser() user: User,
    @Args() { uuid }: DeleteQuestionArgs,
  ) {
    return await this.questionService.delete(uuid, user);
  }
}
