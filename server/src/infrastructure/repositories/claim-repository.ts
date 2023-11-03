import Claim from "../../domain/entities/claim.entity";

class ClaimRepository {
  private claims: Claim[];
  public constructor() {
    this.claims = [];
  }
  public async save(claim: Claim): Promise<void> {
    const saveClaim = this.claims.find((a) => a.getId() === claim.getId());
    if (saveClaim) {
      this.claims.splice(this.claims.indexOf(saveClaim), 1);
    }
    this.claims.push(claim);
  }
  public async findOneById(id: string): Promise<Claim | null> {
    const claim = this.claims.find((a) => a.getId() === id);
    return claim ? claim : null;
  }
  public async findLast5Claims(): Promise<Claim[]> {
    const sortedClaims = this.claims.sort((a, b) => {
      return b.createAt.getTime() - a.createAt.getTime();
    });
    const last5Claims = sortedClaims.slice(0, 5);
    return last5Claims;
  }
}
export default new ClaimRepository();
