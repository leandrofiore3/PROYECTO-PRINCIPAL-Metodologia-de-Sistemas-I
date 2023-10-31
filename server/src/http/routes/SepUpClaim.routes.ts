import { Application } from 'express';
import CommonRoutes from './common.routes';
import CreateClaimAction from '../actions/CreateClaimAction';
import likeAction from '../actions/like.action';

class ClaimRoutes extends CommonRoutes {
  public constructor(app: Application) {
    super(app, 'Claim');
  }

  public setUpRoutes(): Application {
    this.app.post('/claim', CreateClaimAction.run);
    this.app.put('/like', likeAction.run)

    return this.app;
  }
}

export default ClaimRoutes;