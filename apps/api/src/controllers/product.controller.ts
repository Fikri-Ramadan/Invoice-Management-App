import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export class ProductController {
  async getMyProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await prisma.product.findMany({
        where: {
          userId: req?.dataUser?.id
        }
      });

      return res.status(200).json({ success: true, results: products });
    } catch (error) {
      return next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const product = await prisma.product.findUnique({
        where: {
          id: Number(id)
        }
      });

      return res.status(200).json({ success: true, results: product });
    } catch (error) {
      return next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price } = req.body;
      const file: any = req.file;
      console.log(req.body);

      if (!file) {
        return res.status(400).json({
          success: false,
          message: 'no image uploaded'
        });
      }

      const imageUrl = process.env.BASE_URL + '/images/' + file?.filename;

      const newProduct = await prisma.product.create({
        data: {
          name, description,
          price: price,
          picture: imageUrl,
          userId: req?.dataUser?.id
        }
      });

      return res.status(201).json({ success: true, results: newProduct });
    } catch (error) {
      return next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description, price } = req.body;

      const product = await prisma.product.findUnique({
        where: { id: Number(id) }
      });

      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

      const isMyProduct = product.userId == req?.dataUser?.id;
      if (!isMyProduct) return res.status(403).json({ success: false, message: 'Not your product' });

      const updatedProduct = await prisma.product.update({
        where: {
          id: product?.id
        }, data: {
          name, description, price
        }
      });

      return res.status(200).json({ success: true, resutls: updatedProduct });
    } catch (error) {
      return next(error);
    }
  }
}