import { EntityRepository, Repository } from 'typeorm';
import { Question } from './question.entity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  findOneByIdx(idx: number, isTemp: boolean): Promise<Question> {
    return this.createQueryBuilder()
      .where('idx = :idx', { idx })
      .andWhere('is_temp = :isTemp', { isTemp })
      .getOne();
  }

  findOneWithTagsAndUserByIdx(idx: number, isTemp: boolean): Promise<Question> {
    return this.createQueryBuilder('question')
      .leftJoinAndSelect('question.tags', 'tag')
      .leftJoinAndSelect('question.user', 'user')
      .where('question.idx = :idx', { idx })
      .andWhere('question.is_temp = :isTemp', { isTemp })
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
      .where('is_temp = :isTemp', { isTemp })
      .andWhere('user.idx = :userIdx', { userIdx })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('question.created_at', 'ASC')
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
      .where('is_temp = :isTemp', { isTemp })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('question.created_at', 'ASC')
      .getMany();
  }
}
