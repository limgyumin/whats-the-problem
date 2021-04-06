import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { UserRepository } from 'src/module/user/user.repository';
import { UserModule } from 'src/module/user/user.module';
import { PostRepository } from './post.repository';
import { ReplyRepository } from '../reply/reply.repository';
import { CommentRepository } from '../comment/comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      UserRepository,
      CommentRepository,
      ReplyRepository,
    ]),
    UserModule,
  ],
  exports: [PostService],
  providers: [PostService, PostResolver],
})
export class PostModule {}
