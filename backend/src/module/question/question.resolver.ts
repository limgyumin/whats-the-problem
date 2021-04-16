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
import { User } from '../user/user.entity';
import {
  DeleteQuestionArgs,
  GetQuestionArgs,
  UpdateQuestionArgs,
} from './dto/question.args';
import { CreateQuestionInput, QuestionOption } from './dto/question.input';
import { Question } from './question.entity';
import { QuestionService } from './question.service';

@Resolver(Question)
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Query(() => Question)
  async question(@Args() { idx }: GetQuestionArgs): Promise<Question> {
    return await this.questionService.question(idx);
  }

  @Query(() => [Question])
  async questions(
    @Args('option') { page, limit }: QuestionOption,
  ): Promise<Question[]> {
    return await this.questionService.questions(page, limit);
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
    @Args() { idx, question }: UpdateQuestionArgs,
  ) {
    return await this.questionService.update(idx, question, user);
  }

  @Mutation(() => Question)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async deleteQuestion(
    @GetUser() user: User,
    @Args() { idx }: DeleteQuestionArgs,
  ) {
    return await this.questionService.delete(idx, user);
  }
}