import {
  BadRequestException,
  ConflictException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CODE_CHARS, CODE_LENGTH } from 'src/common/constants/verifyCode';
import { emailReg } from 'src/common/emailReg';
import { NodeMailerLib } from 'src/lib/nodemailer/nodemailer.lib';
import { Repository } from 'typeorm';
import { Mailer } from './mailer.entity';

@Injectable()
export class MailerService {
  constructor(
    @InjectRepository(Mailer)
    private mailerRepository: Repository<Mailer>,
    private nodeMailerLib: NodeMailerLib,
  ) {}

  async create(email: string, verified: boolean): Promise<Mailer> {
    if (!emailReg.test(email)) {
      throw new BadRequestException('Invalid email.');
    }

    const existEmail = await this.findOneByEmail(email);

    if (existEmail) {
      throw new ConflictException('Email already exist.');
    }

    const mailer = this.mailerRepository.create();

    const verifyCode = this.createVerifyCode();
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    mailer.email = email;
    mailer.verify_code = verifyCode;
    mailer.expired_at = expireDate;
    mailer.is_verified = verified;

    await mailer.save();

    if (!verified) {
      await this.nodeMailerLib.sendAuthMail(email, verifyCode);
    }

    return mailer;
  }

  async verify(email: string, verifyCode: string): Promise<Mailer> {
    const mailer = await this.findOneByEmailAndVerifyCode(email, verifyCode);

    if (!mailer) {
      throw new NotFoundException('Email not found.');
    }

    const currentTime = new Date();

    if (mailer.expired_at <= currentTime) {
      throw new GoneException('Expired email.');
    }

    if (mailer.is_verified) {
      throw new BadRequestException('Email already verified.');
    }

    mailer.is_verified = true;
    return await mailer.save();
  }

  findOneByEmailAndVerifyCode(
    email: string,
    verifyCode: string,
  ): Promise<Mailer> {
    return this.mailerRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .andWhere('verify_code = :verifyCode', { verifyCode })
      .getOne();
  }

  findOneByEmail(email: string): Promise<Mailer> {
    return this.mailerRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();
  }

  createVerifyCode(): string {
    let verifyCode = '';
    for (var i = 0; i < CODE_LENGTH; i++) {
      var random = Math.floor(Math.random() * CODE_CHARS.length);
      verifyCode += CODE_CHARS.substring(random, random + 1);
    }
    return verifyCode;
  }
}
