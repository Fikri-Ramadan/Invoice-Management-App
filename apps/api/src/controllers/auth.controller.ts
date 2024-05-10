import prisma from "@/prisma";
import { compare, genSalt, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import path from 'path';
import fs from 'fs';
import Handlebars from "handlebars";
import { EmailData, sendEmail } from "@/helpers/nodemailer";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const existingEmail = await prisma.user.findUnique({
        where: {
          email
        }
      });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: 'Email is already exist'
        });
      }

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword
        }
      });

      const registerToken = sign(
        { id: newUser.id, },
        process.env.SECRET_KEY as string,
        { expiresIn: '1h' },
      );

      const urlVerifyEmail = `${process.env.CLIENT_URL}/auth/verify-email?token=${registerToken}`;

      const templateEmail = path.join(
        __dirname,
        '../templates',
        'verifyEmail.hbs',
      );

      const templateSource = fs.readFileSync(templateEmail, 'utf8');
      const compileTemplate = Handlebars.compile(templateSource);

      const emailData: EmailData = {
        from: 'Invoice Management App',
        to: [newUser.email],
        subject: 'Verifikasi Email',
        html: compileTemplate({ urlVerifyEmail }),
      };

      await sendEmail(emailData);

      return res.status(200).json({
        success: true,
        message: 'Check your email for verify account'
      });
    } catch (error) {
      return next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.query;
      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token not found'
        });
      }

      const verifyToken: any = verify(token as string, process.env.SECRET_KEY as string);
      const updatedUser = await prisma.user.update({
        where: {
          id: verifyToken?.id
        },
        data: {
          isVerified: true
        }
      });

      return res.status(200).json({ success: true, message: 'Account successfully verified, try to login !' });
    } catch (error) {
      return next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const emailCheck = await prisma.user.findUnique({
        where: { email }
      });

      if (!emailCheck) return res.status(400).json({ success: false, message: 'Invalid credentials' });

      const isValidPassword = await compare(password, emailCheck.password);
      if (!isValidPassword) return res.status(400).json({ success: false, message: 'Invalid credentials' });

      if (!emailCheck.isVerified) return res.status(200).json({ success: false, message: 'Account is not verified' });

      const token = sign({
        id: emailCheck.id,
        email: emailCheck.email
      }, process.env.SECRET_KEY as string,
        { expiresIn: '24h' });

      return res.status(200).json({
        success: true,
        results: {
          id: emailCheck.id,
          email: emailCheck.email,
          token
        }
      });
    } catch (error) {
      return next(error);
    }
  }

  async getUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const userDetails: any = await prisma.user.findUnique({
        where: {
          id: req.dataUser.id
        }
      });

      delete userDetails.password;

      return res.status(200).json({
        success: true,
        results: userDetails
      });
    } catch (error) {
      return next(error);
    }
  }
}