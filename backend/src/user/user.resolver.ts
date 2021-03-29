import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, QueryValue, UpdateUserInput } from './dto/user.input';
import { User } from './model/user.model';
import { UserService } from './user.service';
import { GetUser } from '../decorator/user.decorator';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { createToken } from 'src/lib/token';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(@Args('option') { page, limit }: QueryValue): Promise<User[]> {
    if (!page || !limit) {
      throw new BadRequestException('Page or limit is null.');
    }

    if (page < 1) {
      throw new BadRequestException('Page is invalid number');
    }

    const users = await this.userService.findAll(page, limit);
    return users;
  }

  @Mutation(() => String)
  async register(@Args('user') data: CreateUserInput): Promise<string> {
    const isExist = await this.userService.findOneById(data.id);

    if (isExist) {
      throw new ConflictException('User already exist.');
    }

    const user = await this.userService.create(data);
    return createToken(user);
  }

  @Mutation(() => String)
  async login(
    @Args('id') id: string,
    @Args('password') password: string,
  ): Promise<string> {
    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isMatch = password === user.password;

    if (isMatch) {
      return createToken(user);
    } else {
      throw new NotFoundException('Invalid password.');
    }
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async updateUser(
    @GetUser() user: User,
    @Args('user') data: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.update(user, data);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async deleteUser(@GetUser() user: User) {
    return this.userService.delete(user);
  }
}
