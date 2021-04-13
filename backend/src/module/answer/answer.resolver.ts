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
import { Answer } from './answer.entity';
import { AnswerService } from './answer.service';
import {
  CreateAnswerArgs,
  DeleteAnswerArgs,
  GetAnswersArgs,
  UpdateAnswerArgs,
} from './dto/answer.args';

@Resolver(Answer)
export class AnswerResolver {
  constructor(private answerService: AnswerService) {}

  @Query(() => [Answer])
  async answers(@Args() { questionIdx }: GetAnswersArgs): Promise<Answer[]> {
    return await this.answerService.answers(questionIdx);
  }

  @ResolveField(() => Int)
  async commentCount(@Parent() parent: Answer): Promise<number> {
    return await this.answerService.commentCount(parent.idx);
  }

  @Mutation(() => Answer)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async createAnswer(
    @GetUser() user: User,
    @Args() { questionIdx, content }: CreateAnswerArgs,
  ): Promise<Answer> {
    return await this.answerService.create(questionIdx, content, user);
  }

  @Mutation(() => Answer)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async updateAnswer(
    @GetUser() user: User,
    @Args() { idx, content }: UpdateAnswerArgs,
  ): Promise<Answer> {
    return await this.answerService.update(idx, content, user);
  }

  @Mutation(() => Answer)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async deleteAnswer(
    @GetUser() user: User,
    @Args() { idx }: DeleteAnswerArgs,
  ): Promise<Answer> {
    return await this.answerService.delete(idx, user);
  }
}
