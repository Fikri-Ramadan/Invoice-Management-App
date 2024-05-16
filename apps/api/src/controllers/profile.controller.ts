import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export class ProfileController {
  async getProfileByToken(req: Request, res: Response, next: NextFunction) {
    try {
      const myDetails = await prisma.user.findUnique({
        where: { id: req?.dataUser?.id }
      });

      return res.status(200).json({ success: true, results: myDetails });
    } catch (error) {
      return next(error);
    }
  }

  async updateProfileByToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstname, lastname, phone, companyName, norek, bio } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: req?.dataUser?.id },
        data: {
          firstname, lastname, phone, companyName, norek, bio
        }
      });

      return res.status(200).json({ success: true, results: updatedUser });
    } catch (error) {
      return next(error);
    }
  }
}