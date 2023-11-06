import express from 'express';
import CommonRoutes from './http/routes/common.routes';
import cors from 'cors';
import { log } from 'debug';
import expressWinston from 'express-winston';
import winston from 'winston';
import CategoriesRoutes from './http/routes/SetUpCategories.routes';
import SeederCategory from './infrastructure/seeders/seeder.category';
import VisitorRoutes from './http/routes/SetUpVisitor.routes';
import ClaimRoutes from './http/routes/SetUpClaim.routes';
import SeederVisitor from './infrastructure/seeders/seeder.visitor';
import SeederClaim from './infrastructure/seeders/seeder.claim';

const app: express.Application = express();

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true }),
  ),
};

// @ts-ignore
if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

app.use(expressWinston.logger(loggerOptions));

const routes: Array<CommonRoutes> = [];
app.use(cors());
app.use(express.json());

try {
  SeederCategory.generate();
  SeederVisitor.generate();
  SeederClaim.generate();
} catch {
  console.log('error generating seeders');
}

routes.push(new CategoriesRoutes(app));
routes.push(new VisitorRoutes(app));
routes.push(new ClaimRoutes(app));

app.listen(3000, async () => {
  routes.forEach((route: CommonRoutes) => {
    log(`Routes configured for ${route.getName()}`);
  });
  log('Server listening on port 3000');
});

