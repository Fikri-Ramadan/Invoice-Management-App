import { InvoiceController } from "@/controllers/invoice.controller";
import { verifyToken } from "@/middlewares/verifyJwt";
import { Router } from "express";

export class InvoiceRouter {
  private router: Router;
  private invoiceController: InvoiceController;

  constructor() {
    this.router = Router();
    this.invoiceController = new InvoiceController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', verifyToken, this.invoiceController.getMyInvoices);
    this.router.get('/:id', this.invoiceController.getInvoiceById);
    this.router.post('/', verifyToken, this.invoiceController.createInvoice);
    this.router.post('/send', verifyToken, this.invoiceController.sendInvoice);
  }

  getRouter() {
    return this.router;
  }
}