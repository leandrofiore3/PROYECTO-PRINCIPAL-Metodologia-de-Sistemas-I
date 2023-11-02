import Claim from "../../domain/entities/claim.entity";

export class ClaimRepository {
    private claims: Claim[];
    public constructor() {
        this.claims = [];
    }

    public async save(claim: Claim): Promise<void> {
        const saveClaim = this.claims.find(a => a.getId() === claim.getId());
        if (saveClaim) {
            this.claims.splice(this.claims.indexOf(saveClaim), 1);
        }
        this.claims.push(claim);
    }

    public async findOneById(id: string): Promise<Claim | null> {
        const claim = this.claims.find(a => a.getId() === id);
        return claim ? claim : null;
    }

    public async lastFiveOnFireInLastHour(): Promise<Claim[]> {
        const now = new Date();
        const oneHourAgo = new Date(now);
        oneHourAgo.setHours(now.getHours() - 1);

        const claimsInLastHour = this.claims.filter((claim) => claim.createAt > oneHourAgo);

        claimsInLastHour.sort((a, b) => b.getLikes() - a.getLikes());

        return claimsInLastHour.slice(0, 5);
    }
}

export default new ClaimRepository();