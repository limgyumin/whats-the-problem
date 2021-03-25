import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, QueryValue } from './dto/user.input';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(@Args('option') { page, limit }: QueryValue): Promise<User[]> {
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
}
