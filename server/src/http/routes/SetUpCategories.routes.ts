import { Application } from 'express';
import CommonRoutes from './common.routes';
// importar el getcategoriesaction

class CategoriesRoutes extends CommonRoutes {
    public constructor(app: Application) {
        super(app, 'Categories');
    }

    public setUpRoutes(): Application {
        this.app.get('/categories', getCategoriesAction.run);


        return this.app;
    }
}

export default CategoriesRoutes;