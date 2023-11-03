import { Request, Response } from 'express';
import claimsRepository from '../../infrastructure/repositories/claim-repository';

class GetLastVisitorClaimsAction {
    public async run(req: Request, res: Response) {
        const { id } = req.body;
        try {
            const lastVisitorClaims = await claimsRepository.findLastClaimsByVisitorId(id);

            if (lastVisitorClaims.length === 0) {
                return res.status(404).send("No hay claims presentados por este usuario");
            };

            return res.status(200).json(lastVisitorClaims);
        } catch (error) {
            return res.status(500).json({ error: 'Error al obtener los ultimos claims.' });
        }
    }
}

export default new GetLastVisitorClaimsAction();