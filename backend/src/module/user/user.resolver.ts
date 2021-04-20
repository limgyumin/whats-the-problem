import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  CreateUserInput,
  GitHubUserInput,
  UpdateUserInput,
  UserPostOption,
  UserQuestionOption,
} from './dto/user.input';
import { User } from './user.entity';
import { UserService } from './user.service';
import { GetUser } from '../../decorator/user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { createToken } from 'src/lib/jwt/token';
import { Roles } from 'src/decorator/role.decorator';
import { Post } from '../post/post.entity';
import { Question } from '../question/question.entity';
import { GetUsersArgs, LoginArgs } from './dto/user.args';

@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async me(@GetUser() user: User): Promise<User> {
    return user;
  }

  @Query(() => User)
  async user(@Args('idx') idx: number): Promise<User> {
    return await this.userService.user(idx);
  }

  @Query(() => [User])
  async users(
    @Args() { userType, option: { page, limit } }: GetUsersArgs,
  ): Promise<User[]> {
    return await this.userService.users(page, limit, userType);
  }

  @ResolveField(() => [Post])
  async posts(
    @Parent() parent: User,
    @Args('option') { page, limit }: UserPostOption,
  ): Promise<Post[]> {
    return await this.userService.posts(parent.idx, page, limit);
  }

  @ResolveField(() => [Question])
  async questions(
    @Parent() parent: User,
    @Args('option') { page, limit }: UserQuestionOption,
  ): Promise<Question[]> {
    return await this.userService.questions(parent.idx, page, limit);
  }

  @Mutation(() => String)
  async register(@Args('user') data: CreateUserInput): Promise<string> {
    const user: User = await this.userService.create(data);
    return createToken(user);
  }

  @Mutation(() => User)
  async gitHubUser(@Args('code') code: string): Promise<User> {
    return await this.userService.gitHubUser(code);
  }

  @Mutation(() => String)
  async gitHubAuth(@Args('user') data: GitHubUserInput): Promise<string> {
    const user: User = await this.userService.gitHubAuth(data);
    return createToken(user);
  }

  @Mutation(() => String)
  async login(@Args() { email, password }: LoginArgs): Promise<string> {
    const user: User = await this.userService.match(email, password);
    return createToken(user);
  }

  @Mutation(() => User)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async updateUser(
    @GetUser() user: User,
    @Args('user') data: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.update(user, data);
  }

  @Mutation(() => User)
  @Roles('Client')
  @UseGuards(AuthGuard)
  async deleteUser(@GetUser() user: User) {
    return this.userService.delete(user);
  }
}
