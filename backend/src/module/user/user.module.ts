import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GitHubLib } from 'src/lib/github/github.lib';
import { MailerModule } from 'src/module/mailer/mailer.module';
import { MailerRepository } from 'src/module/mailer/mailer.repository';
import { PostRepository } from '../post/post.repository';
import { QuestionRepository } from '../question/question.repository';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      MailerRepository,
      PostRepository,
      QuestionRepository,
    ]),
    MailerModule,
  ],
  exports: [UserService],
  providers: [UserService, UserResolver, GitHubLib],
})
export class UserModule {}
