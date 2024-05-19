import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";
import path from 'path';
import fs from 'fs';
import Handlebars from "handlebars";
import { EmailData, sendEmail } from "@/helpers/nodemailer";
import { addOneDayToDate } from "@/helpers/utils";

export class InvoiceController {
  async getMyInvoices(req: Request, res: Response, next: NextFunction) {
    try {
      const { page } = req.query;

      let take;
      let skip;
      if (page && !isNaN(Number(page))) {
        take = 5;
        skip = take * (Number(page) - 1);
      }

      let statusReq = {};
      if (req.query.status) {
        if (String(req.query.status).toUpperCase() == 'PENDING') statusReq = { equals: 'PENDING' };
        else if (String(req.query.status).toUpperCase() == 'PAID') statusReq = { equals: 'PAID' };
        else if (String(req.query.status).toUpperCase() == 'DUE_DATE') statusReq = { equals: 'DUE_DATE' };
      }

      let date;
      let plusOneDay;
      if (req.query.date) {
        date = new Date(String(req.query.date));
        plusOneDay = addOneDayToDate(new Date(String(req.query.date)));
      }


      const invoices = await prisma.invoice.findMany({
        where: {
          userId: req?.dataUser?.id,
          status: statusReq,
          OR: [
            { invoiceNumber: { contains: String(req.query.search) } },
            { client: { name: { contains: String(req.query.search) } } },
          ],
          createdAt: {
            lte: plusOneDay,
            gte: date
          }
        },
        include: {
          client: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: take,
        skip: skip
      });

      const totalInvoice = await prisma.invoice.count({
        where: {
          userId: req?.dataUser?.id,
          status: statusReq,
          OR: [
            { invoiceNumber: { contains: String(req.query.search) } },
            { client: { name: { contains: String(req.query.search) } } },
          ],
          createdAt: {
            lte: plusOneDay,
            gte: date
          }
        },
      });

      return res.status(200).json({ success: true, results: { totalInvoice, invoices } });
    } catch (error) {
      return next(error);
    }
  }

  async getInvoiceById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const invoice = await prisma.invoice.findUnique({
        where: { id: id },
        include: {
          invoiceDetails: true
        }
      });
      if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });

      return res.status(200).json({ success: true, results: invoice });
    } catch (error) {
      return next(error);
    }
  }

  async createInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const { clientId, dueDate, payment, productId, quantity, price, subTotal } = req.body;

      const isValidClient = await prisma.client.findUnique({
        where: { id: Number(clientId), userId: req?.dataUser?.id }
      });
      if (!isValidClient) return res.status(400).json({ success: false, message: 'Invalid client' });

      // const isValidProduct = await prisma.product.findUnique({
      //   where: { id: Number(productId), userId: req?.dataUser?.id }
      // });
      // if (!isValidProduct) return res.status(400).json({ success: false, message: 'Invalid product' });

      const invoiceNumber = `INV_${Date.now()}_${clientId}`;

      const invoice = await prisma.invoice.create({
        data: {
          clientId: Number(clientId),
          userId: req?.dataUser?.id,
          invoiceNumber, dueDate, payment,
          // invoiceDetails: {
          //   create: {
          //     productId: Number(productId),
          //     quantity, price: Number(price), subTotal: Number(subTotal)
          //   }
          // }
        }
      });

      return res.status(200).json({ success: true, results: invoice });
    } catch (error) {
      return next(error);
    }
  }

  async sendInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const { invoiceId } = req.body;

      const isValidInvoice = await prisma.invoice.findUnique({
        where: {
          id: invoiceId,
          userId: req?.dataUser?.id
        },
        include: {
          invoiceDetails: {
            include: { product: true }
          }
        }
      });
      if (!isValidInvoice) return res.status(400).json({ success: false, message: 'Invalid not found / invoice is not yours' });

      const client = await prisma.client.findUnique({
        where: { id: isValidInvoice?.clientId }
      });

      const product = await prisma.product.findUnique({ where: { id: isValidInvoice?.invoiceDetails[0]?.productId } });

      const profile = await prisma.user.findUnique({ where: { id: req?.dataUser?.id } });

      const products = isValidInvoice?.invoiceDetails?.map((details) => {
        return {
          BASE_IMAGE_URL: process.env.BASE_IMAGE_URL + '/' + details?.product?.picture,
          productName: details?.product?.name,
          quantity: details?.quantity,
          price: 'Rp. ' + details?.price,
          subTotal: 'Rp. ' + details?.subTotal,
          productDesc: details?.product?.description
        };
      });

      const total = 'Rp. ' + isValidInvoice?.invoiceDetails?.reduce((acc, curr) => acc + curr?.subTotal, 0);

      const data = {
        companyName: profile?.companyName,
        companyEmail: profile?.email,
        clientName: client?.name,
        status: isValidInvoice?.status,
        isPending: isValidInvoice?.status == 'PENDING',
        isPaid: isValidInvoice?.status == 'PAID',
        PAID_DATE: new Date(isValidInvoice.paidDate || '').toLocaleString('en-US'),
        DUE_DATE: new Date(isValidInvoice.dueDate).toLocaleString('en-US'),
        payment: isValidInvoice.payment,
        BASE_URL: process.env.BASE_URL,
        products: products,
        total: total,
      };

      const templateEmail = path.join(
        __dirname,
        '../templates',
        'invoice.hbs',
      );

      const templateSource = fs.readFileSync(templateEmail, 'utf8');
      const compileTemplate = Handlebars.compile(templateSource);

      const emailData: EmailData = {
        from: 'Invoice Management App',
        to: [client?.email],
        subject: `Invoice ${isValidInvoice.invoiceNumber}`,
        html: compileTemplate({ ...data }),
      };

      sendEmail(emailData);

      await prisma.invoice.update({
        where: { id: isValidInvoice.id },
        data: {
          emailSent: new Date(),
        }
      });

      return res.status(200).json({ success: true, message: 'Invoice sended to client email' });
    } catch (error) {
      return next(error);
    }
  }

  async payInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const { invoiceId } = req.body;

      const isValidInvoice = await prisma.invoice.findUnique({
        where: {
          id: invoiceId,
          userId: req?.dataUser?.id
        },
      });
      if (!isValidInvoice) return res.status(400).json({ success: false, message: 'Invalid not found / invoice is not yours' });

      await prisma.invoice.update({
        where: { id: isValidInvoice?.id },
        data: {
          status: 'PAID',
          paidDate: new Date()
        }
      });

      return res.status(200).json({ success: true, message: 'Invoice successfully paid' });
    } catch (error) {
      return next(error);
    }
  }
}