import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMailerArgs, VerifyMailerArgs } from './dto/mailer.args';
import { MailerOption } from './dto/mailer.input';
import { Mailer } from './mailer.entity';
import { MailerService } from './mailer.service';

@Resolver(Mailer)
export class MailerResolver {
  constructor(private mailerService: MailerService) {}

  @Query(() => [Mailer])
  async mailers(
    @Args('option') { page, limit }: MailerOption,
  ): Promise<Mailer[]> {
    return this.mailerService.mailers(page, limit);
  }

  @Mutation(() => Mailer)
  async createMailer(@Args() { email }: CreateMailerArgs): Promise<Mailer> {
    return await this.mailerService.create(email);
  }

  @Mutation(() => Mailer)
  async verifyMailer(
    @Args() { email, verifyCode }: VerifyMailerArgs,
  ): Promise<Mailer> {
    return await this.mailerService.verify(email, verifyCode);
  }
}
