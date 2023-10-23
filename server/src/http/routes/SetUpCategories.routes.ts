import { Application } from 'express';
import CommonRoutes from './common.routes';
import getCategoriesAction from 'http/actions/getCategories.action';

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