import { Application } from 'express';
import CommonRoutes from './common.routes';
import CreateClaimAction from '../actions/CreateClaimAction';
import likeAction from '../actions/like.action';
import DislikeAction from '../actions/dislike-action';
import getLastFiveAction from '../../http/actions/getLastFive.action';
import getLastClaimsAction from '../../http/actions/getLastClaimsAction';
import getLastVisitorClaims from '../../http/actions/getLastVisitorClaims';
import ReportClaimAction from '../actions/reportClaimAction';

class ClaimRoutes extends CommonRoutes {
  public constructor(app: Application) {
    super(app, 'Claim');
  }

  public setUpRoutes(): Application {
    this.app.post('/claim', CreateClaimAction.run);
    this.app.put('/claim/like', likeAction.run);
    this.app.put('/claim/dislike', DislikeAction.run);
    this.app.get('/fiveOnFire', getLastFiveAction.run);
    this.app.get('/lastClaims', getLastClaimsAction.run);
    this.app.get('/lastClaimsVisitor/:id', getLastVisitorClaims.run);
    this.app.post('/reportClaim/:claimId/:id', ReportClaimAction.run);

    return this.app;
  }
}

export default ClaimRoutes;
