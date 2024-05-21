import nodemailer from 'nodemailer';

export interface EmailData {
  from: string;
  to: any;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL
  }
});

export const sendEmail = async (data: EmailData) => {
  try {
    const emailOptions = {
      from: {
        name: process.env.FROM_MAIL,
        address: process.env.USER_MAIL,
      },
      to: data.to,
      subject: data.subject,
      html: data.html,
    };
    await transporter.sendMail(emailOptions as any);
  } catch (error) {
    console.error(error);
  }
};