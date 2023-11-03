import { Request, Response } from 'express';
import claimsRepository from '../../infrastructure/repositories/claim-repository';
//import visitorRepository from 'infrastructure/repositories/visitor.repository';

class GetLastVisitorClaimsAction {
    public async run(req: Request, res: Response) {
        const {id} = req.body;
        try {

            const LastVisitorClaims = await claimsRepository.findLastClaimsByVisitorId(id);

            res.status(200).json(LastVisitorClaims);
        } catch (error) {

            res.status(500).json({ error: 'Error al obtener los ultimos claims.' });
        }
    }
}
export default new GetLastVisitorClaimsAction();