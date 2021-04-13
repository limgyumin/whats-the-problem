import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { PostRepository } from 'src/module/post/post.repository';
import { PostModule } from 'src/module/post/post.module';
import { UserModule } from '../user/user.module';
import { ReplyRepository } from '../reply/reply.repository';
import { AnswerRepository } from '../answer/answer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository,
      PostRepository,
      AnswerRepository,
      ReplyRepository,
    ]),
    PostModule,
    UserModule,
  ],
  exports: [CommentService],
  providers: [CommentService, CommentResolver],
})
export class CommentModule {}
