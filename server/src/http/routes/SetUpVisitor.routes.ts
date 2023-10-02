import { Application } from 'express';
import CommonRoutes from './common.routes';
import createVisitorAction from '../actions/createClaimAction';


class VisitorRoutes extends CommonRoutes {
  public constructor(app: Application) {
    super(app, 'Visitor');
  }

  public setUpRoutes(): Application {
    this.app.post('/claim', createVisitorAction.run);
    
    return this.app;
  }
}

export default VisitorRoutes;