import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './module/user/user.module';
import { PostModule } from './module/post/post.module';
import { MailerModule } from './module/mailer/mailer.module';
import { CommentModule } from './module/comment/comment.module';
import { ReplyModule } from './module/reply/reply.module';
import { TagModule } from './module/tag/tag.module';
import { LikeModule } from './module/like/like.module';
import { UploadModule } from './module/upload/upload.module';
import { QuestionModule } from './module/question/question.module';
import { AnswerModule } from './module/answer/answer.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
    }),
    TypeOrmModule.forRoot(),
    UserModule,
    PostModule,
    MailerModule,
    CommentModule,
    ReplyModule,
    TagModule,
    LikeModule,
    UploadModule,
    QuestionModule,
    AnswerModule,
  ],
})
export class AppModule {}
