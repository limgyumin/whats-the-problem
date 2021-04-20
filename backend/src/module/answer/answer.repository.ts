import { EntityRepository, Repository } from 'typeorm';
import { Answer } from './answer.entity';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
  findOneByIdx(idx: number): Promise<Answer> {
    return this.createQueryBuilder().where('idx = :idx', { idx }).getOne();
  }

  findAllWithUserByQuestionIdxOrderByCreatedAtASC(
    questionIdx: number,
  ): Promise<Answer[]> {
    return this.createQueryBuilder('answer')
      .leftJoinAndSelect('answer.user', 'user')
      .where('answer.questionIdx = :questionIdx', { questionIdx })
      .orderBy('answer.createdAt', 'ASC')
      .getMany();
  }

  findAllAndCountByQuestionIdxOrderByCreatedAtASC(
    questionIdx: number,
  ): Promise<number> {
    return this.createQueryBuilder()
      .where('questionIdx = :questionIdx', { questionIdx })
      .getCount();
  }
}
