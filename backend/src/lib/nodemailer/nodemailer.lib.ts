import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { IMailInfo } from './nodemailer.interface';
import { transportOptions, mailOptions } from './nodemailer.options';

@Injectable()
export class NodeMailerLib {
  async sendAuthMail(email: string, verifyCode: string): Promise<void> {
    try {
      const transporter: Mail = nodemailer.createTransport(transportOptions);
      const mailInfo: IMailInfo = await transporter.sendMail(
        mailOptions(email, verifyCode),
      );
      Logger.log(`Message send to ${mailInfo.messageId}`);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
