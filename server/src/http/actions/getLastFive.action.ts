import { Request, Response } from "express";
import ClaimRepository from "../../infrastructure/repositories/claim-repository";

class GetFiveOnFireAction {
    public async run(_req: Request, res: Response) {
        try {
            const lastFiveClaimsOnFire = await ClaimRepository.lastFiveOnFireInLastHour();

            if (lastFiveClaimsOnFire.length === 0) {
                return res.status(404).send("Claims on fire not found");
            }

            return res.status(200).json(lastFiveClaimsOnFire);
        } catch (error) {
            return res.status(500).json({ error: "Error retrieving claims on fire" });
        }
    }
}

export default new GetFiveOnFireAction();