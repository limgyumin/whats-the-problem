import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '../post/post.repository';
import { TagRepository } from './tag.repository';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository, PostRepository])],
  exports: [TagService],
  providers: [TagService, TagResolver],
})
export class TagModule {}
