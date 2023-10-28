import Claim from "../../domain/entities/claim.entity";

class ClaimRepository {
  private claims: Claim[];

  constructor() {
    this.claims = [];
  }

  async save(claim: Claim): Promise<void> {
    const saveClaim = this.claims.find((a) => a.getId() === claim.getId());
    if (saveClaim) {
      this.claims.splice(this.claims.indexOf(saveClaim), 1);
    }
    this.claims.push(claim);
  }

  async findOneById(id: string): Promise<Claim | null> {
    const claim = this.claims.find((a) => a.getId() === id);
    return claim ? claim : null;
  }
}

export default ClaimRepository;
