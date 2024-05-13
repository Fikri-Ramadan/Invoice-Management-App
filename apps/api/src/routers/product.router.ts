import { ProductController } from "@/controllers/product.controller";
import { uploader } from "@/middlewares/uploader";
import { verifyToken } from "@/middlewares/verifyJwt";
import { Router } from "express";

export class ProductRouter {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', verifyToken, this.productController.getMyProduct);
    this.router.get('/:id', verifyToken, this.productController.getProductById);
    this.router.post('/', verifyToken, uploader("IMG", "/images").single('file'), this.productController.createProduct);
    this.router.put('/:id', verifyToken, this.productController.updateProduct);
  }

  getRouter() {
    return this.router;
  }
}