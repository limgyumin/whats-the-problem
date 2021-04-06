import { EntityRepository, Repository } from 'typeorm';
import { Mailer } from './mailer.entity';

@EntityRepository(Mailer)
export class MailerRepository extends Repository<Mailer> {
  findOneByEmailAndVerifyCode(
    email: string,
    verifyCode: string,
  ): Promise<Mailer> {
    return this.createQueryBuilder()
      .where('email = :email', { email })
      .andWhere('verify_code = :verifyCode', { verifyCode })
      .getOne();
  }

  findOneByEmail(email: string): Promise<Mailer> {
    return this.createQueryBuilder()
      .where('email = :email', { email })
      .getOne();
  }

  findAll(page: number, limit: number): Promise<Mailer[]> {
    return this.createQueryBuilder()
      .orderBy('created_at', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }
}
