import { Request, Response } from 'express';
import claimsRepository from '../../infrastructure/repositories/claim-repository';

class GetLastVisitorClaimsAction {
    public async run(req: Request, res: Response) {
        const id = req.params['id'] as string; // Usar la notación de corchetes para acceder a 'id'

        if (!id) {
            return res.status(400).send("ID de visitante no proporcionado.");
        }

        try {
            const lastVisitorClaims = await claimsRepository.findLastClaimsByVisitorId(id);

            if (lastVisitorClaims.length === 0) {
                return res.status(404).send("No hay reclamos presentados por este usuario");
            }

            return res.status(200).json(lastVisitorClaims);
        } catch (error) {
            return res.status(500).json({ error: 'Error al obtener los últimos reclamos.' });
        }
    }
}

export default new GetLastVisitorClaimsAction();