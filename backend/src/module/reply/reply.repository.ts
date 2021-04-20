import { EntityRepository, Repository } from 'typeorm';
import { Reply } from './reply.entity';

@EntityRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
  findOneByIdx(idx: number): Promise<Reply> {
    return this.createQueryBuilder().where('idx = :idx', { idx }).getOne();
  }

  findAllWithUserOrderByCreatedAtASC(commentIdx: number): Promise<Reply[]> {
    return this.createQueryBuilder('reply')
      .leftJoinAndSelect('reply.user', 'user')
      .where('reply.commentIdx = :commentIdx', { commentIdx })
      .orderBy('reply.createdAt', 'ASC')
      .getMany();
  }

  findAllAndCount(commentIdx: number): Promise<number> {
    return this.createQueryBuilder()
      .where('commentIdx = :commentIdx', { commentIdx })
      .getCount();
  }
}
