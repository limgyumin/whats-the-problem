import { EntityRepository, Repository } from 'typeorm';
import { Question } from './question.entity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  findOneByIdx(idx: number, isTemp: boolean): Promise<Question> {
    return this.createQueryBuilder()
      .where('idx = :idx', { idx })
      .andWhere('isTemp = :isTemp', { isTemp })
      .getOne();
  }

  findOneWithTagsAndUserByIdx(idx: number, isTemp: boolean): Promise<Question> {
    return this.createQueryBuilder('question')
      .leftJoinAndSelect('question.tags', 'tag')
      .leftJoinAndSelect('question.user', 'user')
      .where('question.idx = :idx', { idx })
      .andWhere('question.isTemp = :isTemp', { isTemp })
      .getOne();
  }

  findAllWithTagsAndUserByUserIdxOrderByCreatedAtASC(
    page: number,
    limit: number,
    userIdx: number,
    isTemp: boolean,
  ): Promise<Question[]> {
    return this.createQueryBuilder('question')
      .leftJoinAndSelect('question.tags', 'tag')
      .leftJoinAndSelect('question.user', 'user')
      .where('isTemp = :isTemp', { isTemp })
      .andWhere('user.idx = :userIdx', { userIdx })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('question.createdAt', 'ASC')
      .getMany();
  }

  findAllWithTagsAndUserOrderByCreatedAtASC(
    page: number,
    limit: number,
    isTemp: boolean,
  ): Promise<Question[]> {
    return this.createQueryBuilder('question')
      .leftJoinAndSelect('question.tags', 'tag')
      .leftJoinAndSelect('question.user', 'user')
      .where('isTemp = :isTemp', { isTemp })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('question.createdAt', 'ASC')
      .getMany();
  }
}
