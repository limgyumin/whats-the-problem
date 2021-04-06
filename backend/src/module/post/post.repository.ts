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

  findAll(page: number, limit: number, isTemp: boolean): Promise<Post[]> {
    return this.createQueryBuilder()
      .where('is_temp = :isTemp', { isTemp })
      .orderBy('created_at', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  findAllByCategoryIdxAndCount(categoryIdx: number): Promise<number> {
    return this.createQueryBuilder()
      .where('is_temp = :is_temp', { is_temp: false })
      .andWhere('fk_category_idx = :categoryIdx', { categoryIdx })
      .getCount();
  }

  findAllByUserIdx(
    page: number,
    limit: number,
    userIdx: number,
    isTemp: boolean,
  ): Promise<Post[]> {
    return this.createQueryBuilder()
      .where('is_temp = :isTemp', { isTemp })
      .andWhere('fk_user_idx = :userIdx', { userIdx })
      .orderBy('created_at', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }
}
