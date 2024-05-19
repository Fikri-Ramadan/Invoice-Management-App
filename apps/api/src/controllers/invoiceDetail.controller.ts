import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export class InvoiceDetailController {
  async addToInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { productId, quantity, price, subTotal } = req.body;

      const isValidInvoice = await prisma.invoice.findUnique({
        where: { id: String(id), userId: req?.dataUser?.id }
      });
      if (!isValidInvoice) return res.status(400).json({ success: false, message: 'Invalid invoice' });

      const isValidProduct = await prisma.product.findUnique({
        where: { id: Number(productId), userId: req?.dataUser?.id }
      });
      if (!isValidProduct) return res.status(400).json({ success: false, message: 'Invalid product' });

      await prisma.invoiceDetails.create({
        data: {
          invoiceId: id,
          productId, quantity, price, subTotal
        }
      });

      return res.status(200).json({ success: true, message: `Product with id ${productId} successfully added` });
    } catch (error) {
      return next(error);
    }
  }
}