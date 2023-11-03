import { Request, Response } from 'express';
import claimRepository from '../../infrastructure/repositories/claim-repository';

class GetLastClaimsAction {
    public async run(_req: Request, res: Response) {
        try {
            const lastClaims = await claimRepository.findLast5Claims();

            res.status(200).json(lastClaims);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los reclamos más recientes.' });
        }
    }
}

export default new GetLastClaimsAction();