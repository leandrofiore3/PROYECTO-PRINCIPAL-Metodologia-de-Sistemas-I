import VisitorRepository from '../../infrastructure/repositories/visitor.repository';
import CreateClaimCommand from '../commands/createClaim.command';
import ClaimRepository from '../../infrastructure/repositories/claim-repository';
import Claim from '../../domain/entities/claim.entity';

export class CreateClaimHandler {
    private visitorRepository: typeof VisitorRepository;
    private claimRepository: typeof ClaimRepository;

    public constructor(
        visitorRepository: typeof VisitorRepository,
        claimRepository: typeof ClaimRepository
    ) {
        this.visitorRepository = visitorRepository;
        this.claimRepository = claimRepository;
    }

    public async execute(command: CreateClaimCommand): Promise<void> {
        const owner = await this.visitorRepository.findOneById(command.getId());

        if (!owner) {
            throw new Error('Owner does not exist');
        }

        const isPinValid = this.validatePin(command.getVisitorPin());

        if (!isPinValid) {
            throw new Error('Visitor PIN is invalid');
        }

        const claim = Claim.create(
            command.getOwner(),
            command.getTitle(),
            command.getDescription(),
            command.getCategory(),
            command.getLocation(),
            command.getCreatedAt()
        );

        await this.claimRepository.save(claim);
    }

    private validatePin(pin: string): boolean {
        const isValid = pin.length === 6 ? true : false;
        return isValid;
    }
}

export default new CreateClaimHandler(
    VisitorRepository,
    ClaimRepository
);
