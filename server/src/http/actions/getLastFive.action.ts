import { Request, Response } from "express";
import ClaimRepository from "../../infrastructure/repositories/claim-repository";

class GetFiveOnFireAction {
    public async run(_req: Request, res: Response) {
        try {
            const lastFiveClaimsOnFire = await ClaimRepository.lastFiveOnFireInLastHour();
            if (lastFiveClaimsOnFire.length === 0) {
                return res.status(404).send("No hay reclamos 'on fire' en la última hora");
            }
            return res.status(200).json(lastFiveClaimsOnFire);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener los ultimos 5 reclamos 'on fire'" });
        }
    }
}

export default new GetFiveOnFireAction();