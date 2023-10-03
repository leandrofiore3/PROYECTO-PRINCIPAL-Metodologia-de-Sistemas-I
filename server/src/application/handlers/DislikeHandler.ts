import { DislikeCommand } from '../../commands/DislikeCommand.js';
import ClaimRepository from '../../infrastructure/repositories/claim-repository.js'; // Asegúrate de importar el ClaimRepository desde el archivo adecuado.

class DislikeHandler {
  private claimRepository: typeof ClaimRepository;

  public constructor(claimRepository: typeof ClaimRepository) {
    this.claimRepository = claimRepository;
  }

  public async execute(command: DislikeCommand): Promise<void> {
    const claimId = command.getClaimId(); // Asegúrate de tener un método para obtener el ID del reclamo en la clase DislikeCommand.
    const claim = await this.claimRepository.findOneById(claimId);

    if (!claim) {
      throw new Error('Claim does not exist');
    }

    claim.dislike(); // Supongo que la entidad Claim tiene un método dislike() para registrar un dislike en el reclamo.

    await this.claimRepository.save(claim);
  }
}

export default new DislikeHandler(ClaimRepository);
