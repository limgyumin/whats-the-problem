import { EntityRepository, Repository } from 'typeorm';
import { User } from './model/user.model';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findOneById(id: string): Promise<User> {
    return this.createQueryBuilder().where('id = :id', { id }).getOne();
  }

  findAll(page: number, limit: number): Promise<User[]> {
    return this.createQueryBuilder()
      .skip(page - 1 * limit)
      .limit(limit)
      .getMany();
  }
}
