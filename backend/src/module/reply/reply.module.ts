import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyResolver } from './reply.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyRepository } from './reply.repository';
import { CommentRepository } from '../comment/comment.repository';
import { CommentModule } from '../comment/comment.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReplyRepository, CommentRepository]),
    UserModule,
    CommentModule,
  ],
  exports: [ReplyService],
  providers: [ReplyService, ReplyResolver],
})
export class ReplyModule {}
