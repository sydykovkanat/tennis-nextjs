import * as handlebars from 'handlebars';
import * as fs from 'node:fs';
import nodemailer from 'nodemailer';
import path from 'path';
import { UserFields } from '../types/user';

export const sendMail = async (user: UserFields, token: string) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, 'src/utils/email.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const resetUrl = `http://localhost:3000/reset-password/${token}`;
  const replacements = {
    username: user.fullName,
    link: resetUrl,
  };
  const htmlToSend = template(replacements);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tenniskslt@gmail.com',
      pass: 'lwkf dumc iqyr rnoq',
    },
  });
  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: 'Сброс пароля',
    text:
      `Вы получили это письмо, потому что вы запросили сброс пароля для вашего аккаунта.\n\n` +
      `Пожалуйста, перейдите по следующей ссылке, чтобы сбросить ваш пароль:\n\n` +
      `${resetUrl}\n\n` +
      `Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.`,
    html: htmlToSend,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};
