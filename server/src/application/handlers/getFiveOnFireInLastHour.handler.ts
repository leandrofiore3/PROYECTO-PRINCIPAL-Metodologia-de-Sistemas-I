import Claim from "../../domain/entities/claim.entity";
import ClaimRepository from "../../infrastructure/repositories/claim-repository";

class GetFiveOnFireHandler {
    private claimRepository: typeof ClaimRepository;

    public constructor(claimRepository: typeof ClaimRepository) {
        this.claimRepository = claimRepository;
    }

    public async execute(): Promise<Claim[]> {
        const lastFiveOnFire = await this.claimRepository.lastFiveOnFireInLastHour();

        return lastFiveOnFire;
    }
}

export default new GetFiveOnFireHandler(ClaimRepository);