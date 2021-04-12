import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  findOneByIdx(idx: number, isTemp: boolean): Promise<Post> {
    return this.createQueryBuilder()
      .where('idx = :idx', { idx })
      .andWhere('is_temp = :isTemp', { isTemp })
      .getOne();
  }

  findOneWithTagsAndUserByIdx(idx: number, isTemp: boolean): Promise<Post> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.idx = :idx', { idx })
      .andWhere('post.is_temp = :isTemp', { isTemp })
      .getOne();
  }

  findAllWithUserByTagIdx(
    tagIdx: number,
    page: number,
    limit: number,
  ): Promise<Post[]> {
    return this.createQueryBuilder('post')
      .leftJoin('post.tags', 'tag')
      .leftJoinAndSelect('post.tags', 'tagSelect')
      .leftJoinAndSelect('post.user', 'user')
      .where('tag.idx = :tagIdx', { tagIdx })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('post.created_at', 'ASC')
      .getMany();
  }

  findAllAndCountWithTagsByTagIdx(tagIdx: number): Promise<number> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .where('tag.idx = :tagIdx', { tagIdx })
      .getCount();
  }

  findAllWithTagsAndUser(
    page: number,
    limit: number,
    isTemp: boolean,
  ): Promise<Post[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.is_temp = :isTemp', { isTemp })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('post.created_at', 'ASC')
      .getMany();
  }

  findAllWithTagsAndUserByUserIdx(
    page: number,
    limit: number,
    userIdx: number,
    isTemp: boolean,
  ): Promise<Post[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.is_temp = :isTemp', { isTemp })
      .andWhere('post.fk_user_idx = :userIdx', { userIdx })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('post.created_at', 'ASC')
      .getMany();
  }
}
