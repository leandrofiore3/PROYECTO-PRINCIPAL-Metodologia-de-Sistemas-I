import { Application } from 'express';
import CommonRoutes from './common.routes';
import CreateVisitorAction from '../actions/createVisitorAction';
import GetVisitorsAction from '../actions/getVisitorsAction';


class VisitorRoutes extends CommonRoutes {
  public constructor(app: Application) {
    super(app, 'Visitor');
  }

  public setUpRoutes(): Application {
    this.app.post('/visitor', CreateVisitorAction.run);
    this.app.get('/visitors', GetVisitorsAction.run);

    return this.app;
  }
}

export default VisitorRoutes;