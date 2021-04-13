import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { Post } from '../post/post.entity';
import { DeleteTagArgs, GetTagArgs, UpdateTagArgs } from './dto/tag.args';
import { TagOption } from './dto/tag.input';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';

@Resolver(Tag)
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Query(() => Tag)
  async tag(@Args() { idx }: GetTagArgs): Promise<Tag> {
    return await this.tagService.tag(idx);
  }

  @Query(() => [Tag])
  async tags(): Promise<Tag[]> {
    return await this.tagService.tags();
  }

  @ResolveField(() => [Post])
  async posts(
    @Args('option') { page, limit }: TagOption,
    @Parent() parent: Tag,
  ): Promise<Post[]> {
    return await this.tagService.tagPosts(parent.idx, page, limit);
  }

  @ResolveField(() => Int)
  async postCount(@Parent() parent: Tag): Promise<number> {
    return await this.tagService.postCount(parent.idx);
  }

  @Mutation(() => Tag)
  async createTag(@Args('name') name: string): Promise<Tag> {
    return await this.tagService.create(name);
  }

  @Mutation(() => Tag)
  async updateTag(@Args() { idx, name }: UpdateTagArgs): Promise<Tag> {
    return await this.tagService.update(idx, name);
  }

  @Mutation(() => Tag)
  async deleteTag(@Args() { idx }: DeleteTagArgs): Promise<Tag> {
    return await this.tagService.delete(idx);
  }
}
