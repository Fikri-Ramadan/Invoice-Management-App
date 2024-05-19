import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { ClientRouter } from './routers/client.router';
import { ProductRouter } from './routers/product.router';
import { ProfileRouter } from './routers/profile.router';
import { InvoiceRouter } from './routers/invoice.router';
import { InvoiceDetailRouter } from './routers/invoiceDetail.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const authRouter = new AuthRouter();
    const clientRouter = new ClientRouter();
    const productRouter = new ProductRouter();
    const profileRouter = new ProfileRouter();
    const invoiceRouter = new InvoiceRouter();
    const invoiceDetailRouter = new InvoiceDetailRouter();

    this.app.use(express.static('public'));

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/clients', clientRouter.getRouter());
    this.app.use('/api/products', productRouter.getRouter());
    this.app.use('/api/profile', profileRouter.getRouter());
    this.app.use('/api/invoices', invoiceRouter.getRouter());
    this.app.use('/api/invoice', invoiceDetailRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
