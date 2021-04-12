import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/decorator/role.decorator';
import { GetUser } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from '../user/user.entity';
import {
  CreateQuestionInput,
  QuestionOption,
  UpdateQuestionInput,
} from './dto/question.input';
import { Question } from './question.entity';
import { QuestionService } from './question.service';

@Resolver()
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Query(() => Question)
  async question(@Args('idx') idx: number): Promise<Question> {
    return await this.questionService.question(idx);
  }

  @Query(() => [Question])
  async questions(
    @Args('option') { page, limit }: QuestionOption,
  ): Promise<Question[]> {
    return await this.questionService.questions(page, limit);
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
    @Args('idx') idx: number,
    @Args('question') data: UpdateQuestionInput,
  ) {
    return await this.questionService.update(idx, data, user);
  }

  @Mutation(() => Question)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async deleteQuestion(@GetUser() user: User, @Args('idx') idx: number) {
    return await this.questionService.delete(idx, user);
  }
}
