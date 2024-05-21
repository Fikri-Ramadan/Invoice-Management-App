import { ClientController } from "@/controllers/client.controller";
import { newClientValidator } from "@/middlewares/validator";
import { verifyToken } from "@/middlewares/verifyJwt";
import { Router } from "express";

export class ClientRouter {
  private clientController: ClientController;
  private router: Router;

  constructor() {
    this.router = Router();
    this.clientController = new ClientController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', verifyToken, this.clientController.getMyClient);
    this.router.get('/:id', verifyToken, this.clientController.getClientById);
    this.router.post('/', verifyToken, newClientValidator, this.clientController.createClient);
    this.router.put('/:id', verifyToken, this.clientController.updateClient);
    this.router.delete('/:id', verifyToken, this.clientController.softDeleteClient);
  }

  getRouter() {
    return this.router;
  }
}