import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  findOneByIdx(idx: number, isTemp: boolean): Promise<Post> {
    return this.createQueryBuilder()
      .where('idx = :idx', { idx })
      .andWhere('isTemp = :isTemp', { isTemp })
      .getOne();
  }

  findOneWithUserByIdx(idx: number, isTemp: boolean): Promise<Post> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.idx = :idx', { idx })
      .andWhere('post.isTemp = :isTemp', { isTemp })
      .getOne();
  }

  findOneByUrl(url: string, isTemp: boolean): Promise<Post> {
    return this.createQueryBuilder()
      .where('url = :url', { url })
      .andWhere('isTemp = :isTemp', { isTemp })
      .getOne();
  }

  findOneWithUserByUrl(url: string, isTemp: boolean): Promise<Post> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .andWhere('post.url = :url', { url })
      .andWhere('post.isTemp = :isTemp', { isTemp })
      .getOne();
  }

  findOneByUUID(uuid: string, isTemp: boolean): Promise<Post> {
    return this.createQueryBuilder()
      .where('uuid = :uuid', { uuid })
      .andWhere('isTemp = :isTemp', { isTemp })
      .getOne();
  }

  findAllWithUserByTagIdx(
    tagIdx: number,
    page: number,
    limit: number,
  ): Promise<Post[]> {
    return this.createQueryBuilder('post')
      .leftJoin('post.tags', 'tag')
      .leftJoinAndSelect('post.user', 'user')
      .where('tag.idx = :tagIdx', { tagIdx })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('post.createdAt', 'ASC')
      .getMany();
  }

  findAllAndCountWithTagsByTagIdx(tagIdx: number): Promise<number> {
    return this.createQueryBuilder('post')
      .leftJoin('post.tags', 'tag')
      .where('tag.idx = :tagIdx', { tagIdx })
      .getCount();
  }

  findAllWithUserOrderByCreatedAtASC(
    page: number,
    limit: number,
    isTemp: boolean,
  ): Promise<Post[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.isTemp = :isTemp', { isTemp })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('post.createdAt', 'ASC')
      .getMany();
  }

  findAllWithUserOrderByLikeCountDESC(
    page: number,
    limit: number,
    isTemp: boolean,
  ): Promise<Post[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoin('post.likes', 'like')
      .addSelect('COUNT(like.idx) as likeCount')
      .groupBy('post.idx')
      .where('post.isTemp = :isTemp', { isTemp })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('likeCount', 'DESC')
      .getMany();
  }

  findAllWithUserByUserIdxOrderByCreatedAtASC(
    page: number,
    limit: number,
    userIdx: number,
    isTemp: boolean,
  ): Promise<Post[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.isTemp = :isTemp', { isTemp })
      .andWhere('post.userIdx = :userIdx', { userIdx })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('post.createdAt', 'ASC')
      .getMany();
  }
}
