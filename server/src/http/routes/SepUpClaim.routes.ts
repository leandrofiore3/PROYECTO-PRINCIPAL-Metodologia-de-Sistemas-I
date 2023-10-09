import { Application } from 'express';
import CommonRoutes from './common.routes';
import createClaimAction from '../actions/createClaimAction';
import likeAction from '../actions/likeAction';

class ClaimRoutes extends CommonRoutes {
  public constructor(app: Application) {
    super(app, 'Claim');
  }

  public setUpRoutes(): Application {
    this.app.post('/claim', createClaimAction.run);
    this.app.put('/claim',likeAction.run)

    return this.app;
  }
}

export default ClaimRoutes;
