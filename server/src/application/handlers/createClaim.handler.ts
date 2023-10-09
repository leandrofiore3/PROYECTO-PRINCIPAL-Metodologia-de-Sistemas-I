import VisitorRepository from '../../infrastructure/repositories/visitor.repository';
import CreateClaimCommand from '../commands/createClaim.command';
import ClaimRepository from '../../infrastructure/repositories/claim-repository';
import Visitor from '../../domain/entities/visitor.entity';
import Claim from '../../domain/entities/claim.entity';

class CreateClaimHandler {
    private visitorRepository: VisitorRepository;
    private claimRepository: ClaimRepository;

    public constructor(
        visitorRepository: VisitorRepository,
        claimRepository: ClaimRepository
    ) {
        this.visitorRepository = visitorRepository;
        this.claimRepository = claimRepository;
    }

    public async execute(command: CreateClaimCommand): Promise<void> {
        // Obtener el visitante por su ID
        const owner = await this.visitorRepository.findOneById(
            command.getOwner()
        );

        if (!owner) {
            throw new Error('Owner does not exist');
        }

        // Validar el PIN del visitante
        const isPinValid = this.validatePin(owner, command.getVisitorPin());

        if (!isPinValid) {
            throw new Error('Visitor PIN is invalid');
        }

        // Crear el reclamo
        const claim = Claim.create(
            owner,
            command.getTitle(),
            command.getDescription(),
            command.getCategory(),
            command.getLocation(),
            command.getCreatedAt(),
            command.getCloneOf()
        );

        await this.claimRepository.save(claim);
    }

    private validatePin(visitor: Visitor, pin: string): boolean {
        // Comparar el PIN proporcionado con el PIN almacenado en la entidad Visitor
        return visitor.validatePin(pin);
    }
}

export default new CreateClaimHandler(
    VisitorRepository,
    ClaimRepository
);
