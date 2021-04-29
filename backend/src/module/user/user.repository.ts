import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findOneByGitHubId(githubId: string): Promise<User> {
    return this.createQueryBuilder()
      .where('gitHubId = :githubId', { githubId })
      .getOne();
  }

  findOneByEmailAndPassword(email: string, password: string): Promise<User> {
    return this.createQueryBuilder()
      .where('email = :email', { email })
      .andWhere('password = :password', { password })
      .getOne();
  }

  findOneByEmail(email: string): Promise<User> {
    return this.createQueryBuilder()
      .where('email = :email', { email })
      .getOne();
  }

  findOneByIdx(idx: number): Promise<User> {
    return this.createQueryBuilder().where('idx = :idx', { idx }).getOne();
  }

  findOneById(id: string): Promise<User> {
    return this.createQueryBuilder().where('id = :id', { id }).getOne();
  }

  findAllOrderByScoreDESC(page: number, limit: number): Promise<User[]> {
    return this.createQueryBuilder()
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('score', 'DESC')
      .getMany();
  }

  findAllOrderByCreatedAtASC(page: number, limit: number): Promise<User[]> {
    return this.createQueryBuilder()
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('createdAt', 'ASC')
      .getMany();
  }
}
