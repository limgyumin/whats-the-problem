export interface IMailer {
  idx: number;
  email: string;
  verifyCode: string;
  expiredAt: Date;
  isVerified: boolean;
}

export interface ICreateMailerResult {
  createMailer: IMailer;
}

export interface IVerifyMailerResult {
  verifyMailer: IMailer;
}
