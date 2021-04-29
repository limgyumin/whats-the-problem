import {
  BadRequestException,
  ConflictException,
  GoneException,
  Injectable,
} from '@nestjs/common';
import { CODE_CHARS, CODE_LENGTH } from 'src/constants/verify-code';
import { NodeMailerLib } from 'src/lib/nodemailer/nodemailer.lib';
import { createRandomCode } from 'src/lib/random-code';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { Mailer } from './mailer.entity';
import { MailerRepository } from './mailer.repository';

@Injectable()
export class MailerService {
  constructor(
    private userRepository: UserRepository,
    private mailerRepository: MailerRepository,
    private nodeMailerLib: NodeMailerLib,
  ) {}

  async create(email: string): Promise<Mailer> {
    const existUser: User = await this.userRepository.findOneByEmail(email);

    if (existUser) {
      throw new ConflictException('Email already verified.');
    }

    const existEmail: Mailer = await this.mailerRepository.findOneByEmail(
      email,
    );

    if (existEmail) {
      await existEmail.remove();
    }

    const mailer: Mailer = this.mailerRepository.create();

    const verifyCode: string = createRandomCode(CODE_LENGTH, CODE_CHARS);
    const expireDate: Date = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    mailer.email = email;
    mailer.verifyCode = verifyCode;
    mailer.expiredAt = expireDate;
    mailer.isVerified = false;

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
      throw new BadRequestException('Invalid email or verify code.');
    }

    const currentTime: Date = new Date();

    if (mailer.expiredAt <= currentTime) {
      throw new GoneException('Expired email.');
    }

    mailer.isVerified = true;
    return await mailer.save();
  }

  async mailers(page: number, limit: number): Promise<Mailer[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Invalid page or limit.');
    }

    return this.mailerRepository.findAllOrderByCreatedAtASC(page, limit);
  }
}
