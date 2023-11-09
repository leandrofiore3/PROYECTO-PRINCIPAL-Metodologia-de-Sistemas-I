import { CreateClaimHandler } from '../../../../src/application/handlers/createClaim.handler';
import CreateClaimCommand from '../../../../src/application/commands/createClaim.command';
import ClaimRepository from '../../../../src/infrastructure/repositories/claim-repository';
import VisitorRepository from '../../../../src/infrastructure/repositories/visitor.repository';
import Visitor from '../../../../src/domain/entities/visitor.entity';
import Category from '../../../../src/domain/entities/category.entity';

describe('CreateClaimHandler', () => {
    let sut: CreateClaimHandler;

    let mockClaimRepository: typeof ClaimRepository;
    let mockVisitorRepository: typeof VisitorRepository;

    beforeEach(() => {
        mockClaimRepository = ClaimRepository;
        mockVisitorRepository = VisitorRepository;

        mockClaimRepository.save = jest.fn();

        sut = new CreateClaimHandler(mockVisitorRepository, mockClaimRepository);
    });

    test('should create and save a claim', async () => {
        const mockCategory = Category.create("category1", "green")
        const owner = Visitor.create("197.0.0.1", "pepe", "123456");
        const createClaimCommand = new CreateClaimCommand(
            owner.getId(),
            owner,
            "Claim title",
            'Claim Description',
            mockCategory,
            'Location',
            new Date()
        );

        mockVisitorRepository.findOneById = jest.fn().mockResolvedValue(owner);

        await sut.execute(createClaimCommand);

        expect(mockClaimRepository.save).toHaveBeenCalled();
    });
});
