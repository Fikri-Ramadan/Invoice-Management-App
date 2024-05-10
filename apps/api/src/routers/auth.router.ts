import { AuthController } from "@/controllers/auth.controller";
import { verifyToken } from "@/middlewares/verifyJwt";
import { Router } from "express";

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/register', this.authController.register);
    this.router.post('/login', this.authController.signIn);
    this.router.get('/verify-email', this.authController.verifyEmail);
    this.router.get('/verify-token', verifyToken, this.authController.getUserDetails);
  }

  getRouter() {
    return this.router;
  }
}