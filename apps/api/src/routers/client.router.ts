import { ClientController } from "@/controllers/client.controller";
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
    this.router.post('/', verifyToken, this.clientController.createClient);
    this.router.put('/:id', verifyToken, this.clientController.updateClient);
  }

  getRouter() {
    return this.router;
  }
}