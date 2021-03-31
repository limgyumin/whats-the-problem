import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeMailerLib } from 'src/lib/nodemailer/nodemailer.lib';
import { Mailer } from './mailer.entity';
import { MailerResolver } from './mailer.resolver';
import { MailerService } from './mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mailer])],
  exports: [MailerService],
  providers: [MailerResolver, MailerService, NodeMailerLib],
})
export class MailerModule {}
