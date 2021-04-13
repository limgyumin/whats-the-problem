import {
  BadRequestException,
  ConflictException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CODE_CHARS, CODE_LENGTH } from 'src/common/constants/verify-code';
import { emailReg } from 'src/common/email-reg';
import { NodeMailerLib } from 'src/lib/nodemailer/nodemailer.lib';
import { Mailer } from './mailer.entity';
import { MailerRepository } from './mailer.repository';

@Injectable()
export class MailerService {
  constructor(
    private mailerRepository: MailerRepository,
    private nodeMailerLib: NodeMailerLib,
  ) {}

  async create(email: string): Promise<Mailer> {
    if (!emailReg.test(email)) {
      throw new BadRequestException('Invalid email.');
    }

    const existEmail: Mailer = await this.mailerRepository.findOneByEmail(
      email,
    );

    if (existEmail) {
      throw new ConflictException('Email already exist.');
    }

    const mailer: Mailer = this.mailerRepository.create();

    const verifyCode: string = this.createVerifyCode();
    const expireDate: Date = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    mailer.email = email;
    mailer.verify_code = verifyCode;
    mailer.expired_at = expireDate;
    mailer.is_verified = false;

    await mailer.save();

    await this.nodeMailerLib.sendAuthMail(email, verifyCode);

    return mailer;
  }

  async verify(email: string, verifyCode: string): Promise<Mailer> {
    const mailer: Mailer = await this.mailerRepository.findOneByEmailAndVerifyCode(
      email,
      verifyCode,
    );

    if (!mailer) {
      throw new NotFoundException('Email not found.');
    }

    const currentTime: Date = new Date();

    if (mailer.expired_at <= currentTime) {
      throw new GoneException('Expired email.');
    }

    if (mailer.is_verified) {
      throw new BadRequestException('Email already verified.');
    }

    mailer.is_verified = true;
    return await mailer.save();
  }

  async mailers(page: number, limit: number): Promise<Mailer[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Invalid page or limit.');
    }

    return this.mailerRepository.findAll(page, limit);
  }

  createVerifyCode(): string {
    let verifyCode: string = '';
    for (let i = 0; i < CODE_LENGTH; i++) {
      let random: number = Math.floor(Math.random() * CODE_CHARS.length);
      verifyCode += CODE_CHARS.substring(random, random + 1);
    }
    return verifyCode;
  }
}
