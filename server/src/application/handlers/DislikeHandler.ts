import DislikeCommand from "../../application/commands/DislikeCommand";
import ClaimRepository from "../../infrastructure/repositories/claim-repository";
import Visitor from "../../domain/entities/visitor.entity";

class DislikeHandler {
  private claimRepository: typeof ClaimRepository;

  public constructor(claimRepository: typeof ClaimRepository) {
    this.claimRepository = claimRepository;
  }

  public async execute(
    command: DislikeCommand,
    visitor: Visitor
  ): Promise<void> {
    const claimId = command.getId();
    const claim = await this.claimRepository.findOneById(claimId);

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

export default new DislikeHandler(ClaimRepository);
