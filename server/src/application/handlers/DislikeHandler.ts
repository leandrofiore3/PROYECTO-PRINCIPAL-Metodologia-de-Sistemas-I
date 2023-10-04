import { Request, Response } from "express";
import { DislikeCommand } from "../../commands/DislikeCommand.js";
import ClaimRepository from "../../infrastructure/repositories/claim-repository.js"; // Asegúrate de importar el ClaimRepository desde el archivo adecuado.
import Visitor from "../../domain/entities/visitor.entity.js";
class DislikeHandler {
  private claimRepository: typeof ClaimRepository;

  public constructor(claimRepository: typeof ClaimRepository) {
    this.claimRepository = claimRepository;
  }

  public async execute(
    command: DislikeCommand,
    visitor: Visitor
  ): Promise<void> {
    const claimId = command.getClaimId();
    const claim = await this.claimRepository.findOneById(claimId);

    if (!claim) {
      throw new Error("Claim does not exist");
    }
    const providedPin = command.getVisitorPin();
    if (providedPin !== visitor.getPin()) {
      throw new Error("Invalid PIN");
    }

    claim.dislike();

    await this.claimRepository.save(claim);
  }
}

export default new DislikeHandler(ClaimRepository);
