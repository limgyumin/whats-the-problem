import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from './question.repository';
import { UserModule } from '../user/user.module';
import { TagRepository } from '../tag/tag.repository';
import { AnswerRepository } from '../answer/answer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionRepository,
      AnswerRepository,
      TagRepository,
    ]),
    UserModule,
  ],
  exports: [QuestionService],
  providers: [QuestionService, QuestionResolver],
})
export class QuestionModule {}
