import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { UserRepository } from 'src/user/user.repository';
import { UserModule } from 'src/user/user.module';
import { PostRepository } from './post.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository, UserRepository]),
    UserModule,
  ],
  exports: [PostService],
  providers: [PostService, PostResolver],
})
export class PostModule {}
