import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeRepository } from './like.repository';
import { PostRepository } from '../post/post.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeRepository, PostRepository]),
    UserModule,
  ],
  exports: [LikeService],
  providers: [LikeService, LikeResolver],
})
export class LikeModule {}
