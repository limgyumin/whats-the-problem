import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeMailerLib } from 'src/lib/nodemailer/nodemailer.lib';
import { UserRepository } from '../user/user.repository';
import { MailerRepository } from './mailer.repository';
import { MailerResolver } from './mailer.resolver';
import { MailerService } from './mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([MailerRepository, UserRepository])],
  exports: [MailerService],
  providers: [MailerResolver, MailerService, NodeMailerLib],
})
export class MailerModule {}
