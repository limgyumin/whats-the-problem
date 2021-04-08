import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  findOneByIdx(idx: number): Promise<Comment> {
    return this.createQueryBuilder().where('idx = :idx', { idx }).getOne();
  }

  findAllWithUser(postIdx: number): Promise<Comment[]> {
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.fk_post_idx = :postIdx', { postIdx })
      .orderBy('comment.created_at', 'ASC')
      .getMany();
  }

  findAllAndCount(postIdx: number): Promise<number> {
    return this.createQueryBuilder()
      .where('fk_post_idx = :postIdx', { postIdx })
      .getCount();
  }
}