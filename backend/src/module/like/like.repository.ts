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
      .andWhere('like.userIdx = :userIdx', { userIdx })
      .getOne();
  }

  findAllAndCountByPostIdx(postIdx: number): Promise<number> {
    return this.createQueryBuilder()
      .where('postIdx = :postIdx', { postIdx })
      .getCount();
  }
}
