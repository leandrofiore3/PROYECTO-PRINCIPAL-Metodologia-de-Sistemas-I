import ReportClaimCommand from 'application/commands/ReportClaimCommand';
import ClaimRepository from '../../infrastructure/repositories/claim-repository';
import VisitorRepository from '../../infrastructure/repositories/visitor.repository';

class ReportClaimHandler {
  private claimRepository: typeof ClaimRepository;
  private visitorRepository: typeof VisitorRepository;

  public constructor(claimRepository: typeof ClaimRepository, visitorRepository: typeof VisitorRepository) {
    this.claimRepository = claimRepository;
    this.visitorRepository = visitorRepository;
  }

  public async handle(command: ReportClaimCommand): Promise<void> {
    const claimId = command.getClaimId();

    const claim = await this.claimRepository.findOneById(claimId);

    if (!claim) {
      throw new Error('Claim does not exist');
    }

    if (claim.isReported()) {
      throw new Error('Claim has already been reported.');
    }

    // Obtener el usuario que realiza la denuncia 
    const reportedBy = await this.visitorRepository.findOneById('visitorId'); // Reemplazar 'userId' 

    if (!reportedBy) {
      throw new Error('Reporting user does not exist');
    }

    // Marcar el reclamo como reportado
    //claim.markAsReported(reportedBy, new Date());
    claim.markAsReported();

    await this.claimRepository.save(claim);
  }
}

export default new ReportClaimHandler(ClaimRepository, VisitorRepository);
