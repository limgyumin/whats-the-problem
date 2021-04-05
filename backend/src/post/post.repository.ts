import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  findOneByIdx(idx: number): Promise<Post> {
    return this.createQueryBuilder().where('idx = :idx', { idx }).getOne();
  }

  findAll(page: number, limit: number): Promise<Post[]> {
    return this.createQueryBuilder()
      .orderBy('created_at', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }
}
