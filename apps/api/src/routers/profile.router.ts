import { ProfileController } from "@/controllers/profile.controller";
import { verifyToken } from "@/middlewares/verifyJwt";
import { Router } from "express";

export class ProfileRouter {
  private router: Router;
  private profileController: ProfileController;

  constructor() {
    this.router = Router();
    this.profileController = new ProfileController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', verifyToken, this.profileController.getProfileByToken);
    this.router.put('/', verifyToken, this.profileController.updateProfileByToken);
  }

  getRouter() {
    return this.router;
  }
}