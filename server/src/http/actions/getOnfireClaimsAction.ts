import { Request, Response } from "express";
import ClaimRepository from "../../infrastructure/repositories/claim-repository";

class GetOnFireClaimsAction {
    private claimRepository: ClaimRepository;

    constructor(claimRepository: ClaimRepository) {
        this.claimRepository = claimRepository;
    }

    public async run(req: Request, res: Response) {
        try {
            // Sujeto a la creacion del metodo On Fire aqui se llama a ese metodo   
            const onFireClaims = await this.claimRepository.findOnFireClaimsInLastHour();

            res.status(200).json(onFireClaims);
        } catch (error) {
            const { message } = error as Error;
            res.status(400).json({ message: message });
        }
    }
}

export default GetOnFireClaimsAction;