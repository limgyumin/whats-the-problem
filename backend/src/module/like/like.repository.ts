import { EntityRepository, Repository } from 'typeorm';
import { Like } from './like.entity';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  findAllWithUserByPostIdx(postIdx: number): Promise<Like[]> {
    return this.createQueryBuilder('like')
      .leftJoinAndSelect('like.post', 'post')
      .leftJoinAndSelect('like.user', 'user')
      .where('post.idx = :postIdx', { postIdx })
      .getMany();
  }

  findOneByPostIdxAndUserIdx(postIdx: number, userIdx: number): Promise<Like> {
    return this.createQueryBuilder('like')
      .leftJoinAndSelect('like.post', 'post')
      .where('post.idx = :postIdx', { postIdx })
      .andWhere('like.fk_user_idx = :userIdx', { userIdx })
      .getOne();
  }

  findAllAndCountByPostIdx(postIdx: number): Promise<number> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .getCount();
  }
}
