import ReportClaimCommand from '../../application/commands/ReportClaimCommand';
import ClaimRepository from '../../infrastructure/repositories/claim-repository';
import VisitorRepository from '../../infrastructure/repositories/visitor.repository';

class ReportClaimHandler {
  private claimRepository: typeof ClaimRepository;
  private visitorRepository: typeof VisitorRepository;

  public constructor(claimRepository: typeof ClaimRepository, visitorRepository: typeof VisitorRepository) {
    this.claimRepository = claimRepository;
    this.visitorRepository = visitorRepository;
  }

  public async handle(command: ReportClaimCommand, userId: string): Promise<void> {
    const claimId = command.getClaimId();

    const claim = await this.claimRepository.findOneById(claimId);

    if (!claim) {
      throw new Error('Claim does not exist');
    }

    // if (claim.isReported()) {
    //   throw new Error('Claim has already been reported.');
    // }

    const reportedBy = await this.visitorRepository.findOneById(userId);

    if (!reportedBy) {
      throw new Error('Reporting user does not exist');
    }

    // claim.markAsReported();

    await this.claimRepository.save(claim);
  }
}

export default ReportClaimHandler;
