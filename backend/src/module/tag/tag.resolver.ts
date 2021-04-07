import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Post } from '../post/post.entity';
import { TagQueryValue } from './dto/tag.input';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';

@Resolver(Tag)
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Query(() => Tag)
  async tag(@Args('idx') idx: number): Promise<Tag> {
    return await this.tagService.tag(idx);
  }

  @Query(() => [Tag])
  async tags(): Promise<Tag[]> {
    return await this.tagService.tags();
  }

  @ResolveField(() => [Post])
  async posts(
    @Args('option') { page, limit }: TagQueryValue,
    @Parent() parent: Tag,
  ): Promise<Post[]> {
    return await this.tagService.tagPosts(parent.idx, page, limit);
  }

  @Mutation(() => Tag)
  async createTag(@Args('name') name: string): Promise<Tag> {
    return await this.tagService.create(name);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Args('idx') idx: number,
    @Args('name') name: string,
  ): Promise<Tag> {
    return await this.tagService.update(idx, name);
  }

  @Mutation(() => Tag)
  async deleteTag(@Args('idx') idx: number): Promise<Tag> {
    return await this.tagService.delete(idx);
  }
}
