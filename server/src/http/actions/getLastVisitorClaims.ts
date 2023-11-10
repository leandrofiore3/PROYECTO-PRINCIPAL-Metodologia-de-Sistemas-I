import { Request, Response } from 'express';
import claimsRepository from '../../infrastructure/repositories/claim-repository';

class GetLastVisitorClaimsAction {
    public async run(req: Request, res: Response) {

        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).send("ID de visitante no proporcionado.");
            }

            console.log('llegó')

            const lastVisitorClaims = await claimsRepository.findLastClaimsByVisitorId(id);

            if (lastVisitorClaims.length === 0) {
                return res.status(404).send("No claims found for this user");
            }

            return res.status(200).json(lastVisitorClaims);
        } catch (error) {
            return res.status(500).json({ error: 'Error retrieving claims of a user' });
        }
    }
}

export default new GetLastVisitorClaimsAction();