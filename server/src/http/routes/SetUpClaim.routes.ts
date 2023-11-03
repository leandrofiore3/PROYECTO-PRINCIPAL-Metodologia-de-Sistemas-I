import { Application } from 'express';
import CommonRoutes from './common.routes';
import CreateClaimAction from '../actions/CreateClaimAction';
import likeAction from '../actions/like.action';
import getLastFiveAction from '../../http/actions/getLastFive.action';
import getLastClaimsAction from '../../http/actions/getLastClaimsAction';
import getLastVisitorClaims from '../../http/actions/getLastVisitorClaims';

class ClaimRoutes extends CommonRoutes {
  public constructor(app: Application) {
    super(app, 'Claim');
  }

  public setUpRoutes(): Application {
    this.app.post('/claim', CreateClaimAction.run);
    this.app.put('/like', likeAction.run)
    this.app.get('/fiveOnFire', getLastFiveAction.run);
    this.app.get('/lastClaims', getLastClaimsAction.run);
    this.app.post('/lastClaimsVisitor', getLastVisitorClaims.run)

    return this.app;
  }
}

export default ClaimRoutes;
