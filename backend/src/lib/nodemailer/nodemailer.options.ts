import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import config from 'src/config';
import internal from 'stream';

const { USER, PASS } = config.NODEMAILER;

export const transportOptions: SMTPTransport.Options = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: USER,
    pass: PASS,
  },
};

export const mailOptions = (
  email: string,
  verifyCode: string | Buffer | internal.Readable | Mail.AttachmentLike,
): Mail.Options => {
  return {
    from: `"What'sTheProblem" <${USER}>`,
    to: email,
    subject: "What'sTheProblem 로그인",
    text: verifyCode,
    html: `<div style="width: 100%; height: auto; padding: 2rem 0">
    <h1
      style="
        text-align: center;
        margin: 0 auto;
        padding: 0;
        font-size: 2rem;
        font-weight: bold;
        color: #2b3039;
      "
    >
      안녕하세요!
    </h1>
    <p
      style="
        text-align: center;
        font-size: 1.025rem;
        color: #2b3039;
        width: 500px;
        margin: 0 auto;
        margin-top: 1.4rem;
      "
    >
      이 메일은 당신의 회원가입을 인증하기 위한 메일입니다.
    </p>
    <p
      style="
        text-align: center;
        font-size: 1.025rem;
        color: #2b3039;
        width: 500px;
        margin: 0 auto;
        margin-bottom: 1.4rem;
      "
    >
      아래의 코드를 입력하여 인증을 완료해주세요.
    </p>
    <div
      style="
        background: #f3f4f5;
        text-decoration: none;
        max-width: 100%;
        width: 500px;
        padding: 1rem 0;
        margin: 0 auto;
        margin-top: 1rem;
        color: #2b3039;
        font-size: 1.25rem;
        border: 1px solid #dfe2e4;
        border-radius: 0.4rem;
        box-sizing: border-box;
      "
    >
      <h1
        style="
          padding: 0;
          text-align: center;
          margin: 0 auto;
          letter-spacing: 10px;
          color: #2b3039;
        "
      >
        ${verifyCode}
      </h1>
    </div>
  </div>`,
  };
};
