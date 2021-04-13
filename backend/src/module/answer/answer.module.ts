import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerRepository } from './answer.repository';
import { QuestionRepository } from '../question/question.repository';
import { UserModule } from '../user/user.module';
import { CommentRepository } from '../comment/comment.repository';
import { ReplyRepository } from '../reply/reply.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AnswerRepository,
      QuestionRepository,
      CommentRepository,
      ReplyRepository,
    ]),
    UserModule,
  ],
  exports: [AnswerService],
  providers: [AnswerService, AnswerResolver],
})
export class AnswerModule {}
