import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export class ClientController {
  async getMyClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { page } = req.query;

      let take = 5;
      let skip;
      if (page && !isNaN(Number(page))) {
        skip = take * (Number(page) - 1);
      }

      const clients = await prisma.client.findMany({
        where: {
          userId: req?.dataUser?.id,
          OR: [
            { name: { contains: String(req.query.search) } },
            { email: { contains: String(req.query.search) } },
          ]
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: take,
        skip: skip
      });

      const totalClient = await prisma.client.count({
        where: {
          userId: req?.dataUser?.id,
          OR: [
            { name: { contains: String(req.query.search) } },
            { email: { contains: String(req.query.search) } },
          ]
        },
      });
      return res.status(200).json({ success: true, results: { totalClient, clients } });
    } catch (error) {
      return next(error);
    }
  }

  async getClientById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const client = await prisma.client.findUnique({
        where: {
          id: Number(id)
        }
      });
      return res.status(200).json({ success: true, results: client });
    } catch (error) {
      return next(error);
    }
  }

  async createClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, address, phone, paymentPreference } = req.body;

      const newClient = await prisma.client.create({
        data: {
          name, email, address, phone, paymentPreference,
          userId: req?.dataUser?.id
        }
      });

      return res.status(201).json({ success: true, results: newClient });
    } catch (error) {
      return next(error);
    }
  }

  async updateClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email, address, phone, paymentPreference } = req.body;
      const client = await prisma.client.findUnique({
        where: {
          id: Number(id),
        }
      });

      if (!client) return res.status(404).json({ success: false, message: 'Client not found' });

      const isMyClient = client?.userId == req?.dataUser?.id;
      if (!isMyClient) return res.status(403).json({ success: false, message: 'Not your client' });

      const updatedClient = await prisma.client.update({
        where: {
          id: client?.id
        }, data: {
          name, email, address, phone, paymentPreference
        }
      });
      return res.status(200).json({ success: true, results: updatedClient });
    } catch (error) {
      return next(error);
    }
  }
}