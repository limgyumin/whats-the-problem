import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MailerQueryValue } from './dto/mailer.input';
import { Mailer } from './mailer.entity';
import { MailerService } from './mailer.service';

@Resolver()
export class MailerResolver {
  constructor(private mailerService: MailerService) {}

  @Query(() => [Mailer])
  async mailers(
    @Args('option') { page, limit }: MailerQueryValue,
  ): Promise<Mailer[]> {
    return this.mailerService.mailers(page, limit);
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
