import { EntityRepository, Repository } from 'typeorm';
import { Tag } from './tag.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  findOneByName(name: string): Promise<Tag> {
    return this.createQueryBuilder().where('name = :name', { name }).getOne();
  }

  findOneByIdx(idx: number): Promise<Tag> {
    return this.createQueryBuilder().where('idx = :idx', { idx }).getOne();
  }

  findOneWithPostsByIdx(idx: number): Promise<Tag> {
    return this.createQueryBuilder('tag')
      .leftJoinAndSelect('tag.posts', 'post')
      .leftJoinAndSelect('post.user', 'user')
      .where('tag.idx = :idx', { idx })
      .getOne();
  }

  findAllOrderByIdxASC(): Promise<Tag[]> {
    return this.createQueryBuilder('tag').orderBy('tag.idx', 'ASC').getMany();
  }
}
