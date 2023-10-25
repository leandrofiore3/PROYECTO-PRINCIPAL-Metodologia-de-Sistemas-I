import Claim from "../../domain/entities/claim.entity";

class ClaimRepository {
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
    public async findLast5Claims(): Promise<Claim[]> {       
        this.claims.sort((a, b) => b.createAt.getTime() - a.createAt.getTime());
        return this.claims.slice(0, 5);
    }

}
export default new ClaimRepository();