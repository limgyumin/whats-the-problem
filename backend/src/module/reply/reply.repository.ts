import { EntityRepository, Repository } from 'typeorm';
import { Reply } from './reply.entity';

@EntityRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
  findOneByIdx(idx: number): Promise<Reply> {
    return this.createQueryBuilder().where('idx = :idx', { idx }).getOne();
  }

  findAll(commentIdx: number): Promise<Reply[]> {
    return this.createQueryBuilder('reply')
      .leftJoinAndSelect('reply.user', 'user')
      .where('reply.fk_comment_idx = :commentIdx', { commentIdx })
      .orderBy('reply.created_at', 'ASC')
      .getMany();
  }

  findAllAndCount(commentIdx: number): Promise<number> {
    return this.createQueryBuilder()
      .where('fk_comment_idx = :commentIdx', { commentIdx })
      .getCount();
  }
}
