import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Mailer } from './mailer.entity';
import { MailerService } from './mailer.service';

@Resolver()
export class MailerResolver {
  constructor(private mailerService: MailerService) {}

  @Query(() => String)
  sayHello(): string {
    return 'hello';
  }

  @Mutation(() => Mailer)
  async createMailer(@Args('email') email: string): Promise<Mailer> {
    return await this.mailerService.create(email, false);
  }

  @Mutation(() => Mailer)
  async verifyMailer(
    @Args('email') email: string,
    @Args('code') verifyCode: string,
  ): Promise<Mailer> {
    return await this.mailerService.verify(email, verifyCode);
  }
}
