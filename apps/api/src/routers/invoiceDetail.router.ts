import { InvoiceDetailController } from "@/controllers/invoiceDetail.controller";
import { verifyToken } from "@/middlewares/verifyJwt";
import { Router } from "express";

export class InvoiceDetailRouter {
  private router: Router;
  private invoiceDetailController: InvoiceDetailController;

  constructor() {
    this.router = Router();
    this.invoiceDetailController = new InvoiceDetailController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/:id', verifyToken, this.invoiceDetailController.addToInvoice);
  }

  getRouter() {
    return this.router;
  }
}