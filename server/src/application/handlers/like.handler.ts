import Visitor from "../../domain/entities/visitor.entity";
import { VisitorRepository } from "../../domain/repositories/visitor.
repository";
import Claim from "../../domain/entities/claim.entity";
import { ClaimRepository } from "../../domain/repositories/claim.repository";
import { LikeCommand } from "../commands/like.command";

class LikeHandler {
  constructor(
    private readonly claimRepository: ClaimRepository,
    private readonly visitorRepository: VisitorRepository
  ) {}

  public async handler(command: LikeCommand): Promise<void> {
    const { id, owner, pin } = command;

    // Verificar si el visitante existe
    const visitor = this.visitorRepository.findOneById(owner.getId());
    if (!visitor) {
      throw new Error('Visitor not found');
    }

    // Verificar si el reclamo existe
    const claim = await this.claimRepository.findOneById(id);
    if (!claim) {
      throw new Error('Claim not found');
    }
    // Validar el PIN del visitante (debe coincidir con el PIN almacenado en el visitante)
    if (visitor.getPin() !== pin) {
      throw new Error('Invalid PIN');
    }

    // lógica para dar "like"
    claim.addLike(visitor);

    // Guardar el reclamo actualizado en el repositorio de reclamos
    await this.claimRepository.save(claim);
  }
}

export default LikeHandler;

