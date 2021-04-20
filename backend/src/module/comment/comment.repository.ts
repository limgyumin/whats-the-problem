import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  findOneByIdx(idx: number): Promise<Comment> {
    return this.createQueryBuilder().where('idx = :idx', { idx }).getOne();
  }

  findAllByAnswerIdxOrderByCreatedAtASC(answerIdx: number): Promise<Comment[]> {
    return this.createQueryBuilder()
      .where('answerIdx = :answerIdx', { answerIdx })
      .orderBy('createdAt', 'ASC')
      .getMany();
  }

  findAllByPostIdxOrderByCreatedAtASC(postIdx: number): Promise<Comment[]> {
    return this.createQueryBuilder()
      .where('postIdx = :postIdx', { postIdx })
      .orderBy('createdAt', 'ASC')
      .getMany();
  }

  findAllWithUserByAnswerIdxOrderByCreatedAtASC(
    answerIdx: number,
  ): Promise<Comment[]> {
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.answerIdx = :answerIdx', { answerIdx })
      .orderBy('comment.createdAt', 'ASC')
      .getMany();
  }

  findAllWithUserByPostIdxOrderByCreatedAtASC(
    postIdx: number,
  ): Promise<Comment[]> {
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.postIdx = :postIdx', { postIdx })
      .orderBy('comment.createdAt', 'ASC')
      .getMany();
  }

  findAllAndCountByPostIdx(postIdx: number): Promise<number> {
    return this.createQueryBuilder()
      .where('postIdx = :postIdx', { postIdx })
      .getCount();
  }
}
