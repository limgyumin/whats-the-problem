export interface IMailer {
  idx: number;
  email: string;
  verifyCode: string;
  expiredAt: Date;
  isVerified: boolean;
}
