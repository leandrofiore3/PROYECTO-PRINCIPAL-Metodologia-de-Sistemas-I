import VisitorRepository from "../../infrastructure/repositories/visitor.repository";
import ClaimRepository from "../../infrastructure/repositories/claim-repository";
import { LikeCommand } from "../commands/like.command";

class LikeHandler {
  constructor(
    private readonly claimRepository: typeof ClaimRepository,
    private readonly visitorRepository: typeof VisitorRepository
  ) { }

  public async handler(command: LikeCommand): Promise<void> {
    const id = command.getId();
    const owner = command.getOwner();
    const pin = command.getPin();

    const visitor = await this.visitorRepository.findOneById(owner);

    if (!visitor) {
      throw new Error('Visitor not found');
    }

    const claim = await this.claimRepository.findOneById(id);
    if (!claim) {
      throw new Error('Claim not found');
    }

    // hacer un metodo para validar el pin
    if (visitor.pin !== pin) {
      throw new Error('Invalid PIN');
    }

    claim.like();

    await this.claimRepository.save(claim);
  }
}

export default new LikeHandler(ClaimRepository, VisitorRepository);

