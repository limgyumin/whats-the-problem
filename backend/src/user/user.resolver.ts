import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, QueryValue, UpdateUserInput } from './dto/user.input';
import { User as UserType } from './model/user.model';
import { UserService } from './user.service';
import { User } from '../decorator/user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserType])
  async users(
    @Args('option') { page, limit }: QueryValue,
  ): Promise<UserType[]> {
    const users = await this.userService.getAllUsers(page, limit);
    return users;
  }

  @Mutation(() => String)
  async register(@Args('user') data: CreateUserInput): Promise<string> {
    const token = await this.userService.registerUser(data);
    return token;
  }

  @Mutation(() => String)
  async login(
    @Args('id') id: string,
    @Args('password') password: string,
  ): Promise<string> {
    const token = await this.userService.loginUser(id, password);
    return token;
  }

  @Mutation(() => UserType)
  @UseGuards(new AuthGuard())
  async updateUser(
    @User() { id }: UserType,
    @Args('user') data: UpdateUserInput,
  ): Promise<UserType> {
    const user = await this.userService.updateUser(id, data);
    return user;
  }

  @Mutation(() => UserType)
  @UseGuards(new AuthGuard())
  async deleteUser(@User() { id }: UserType) {
    const user = await this.userService.deleteUser(id);
    return user;
  }
}
