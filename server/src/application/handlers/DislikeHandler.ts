import DislikeCommand from "../../application/commands/DislikeCommand";
import ClaimRepository from "../../infrastructure/repositories/claim-repository";
import VisitorRepository from "../../infrastructure/repositories/visitor.repository";

class DislikeHandler {

  public constructor(private readonly claimRepository: typeof ClaimRepository, private readonly visitorRpository: typeof VisitorRepository) {
  }

  public async execute(
    command: DislikeCommand,
  ): Promise<void> {
    const claimId = command.getId();
    const claim = await this.claimRepository.findOneById(claimId);
    const owner = command.getOwner();

    const visitor = await this.visitorRpository.findOneById(owner.id)
    if (!visitor) {
      throw new Error("Visitor does not exist");
    }

    if (!claim) {
      throw new Error("Claim does not exist");
    }

    const providedPin = command.getPin();

    if (providedPin !== visitor.getPin()) {
      throw new Error("Invalid PIN");
    }

    claim.dislike(claimId);

    await this.claimRepository.save(claim);
  }
}

export default new DislikeHandler(ClaimRepository, VisitorRepository);
