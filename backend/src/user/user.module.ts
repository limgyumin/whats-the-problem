import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GitHubLib } from 'src/lib/github/github.lib';
import { MailerModule } from 'src/mailer/mailer.module';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailerModule],
  exports: [UserService],
  providers: [UserService, UserResolver, GitHubLib],
})
export class UserModule {}
